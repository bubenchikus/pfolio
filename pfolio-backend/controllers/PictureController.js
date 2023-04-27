import fs from "fs";
import * as databaseFunctions from "../db/pictureDatabaseQueries.js";

async function getPicturesByCategory(category, res) {
  try {
    const pictures = await databaseFunctions.getPicturesByCategory(category);

    if (!pictures) {
      return res
        .status(404)
        .json({ message: "Pictures not found (by category)!" });
    }

    res.json(pictures);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting pictures failed (by category )!" });
  }
}

export const getAllPictures = async (_, res) => {
  try {
    const pictures = await databaseFunctions.getAllPictures();

    if (!pictures) {
      return res.status(404).json({ message: "Pictures not found (all)!" });
    }
    res.json(pictures);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting pictures failed!" });
  }
};

export const getCGPaintLeft = async (_, res) => {
  getPicturesByCategory("cg-paint-left", res);
};

export const getCGPaintRight = async (_, res) => {
  getPicturesByCategory("cg-paint-right", res);
};

export const getCGGraph = async (_, res) => {
  getPicturesByCategory("cg-graph", res);
};

export const getTrad = async (_, res) => {
  getPicturesByCategory("trad", res);
};

export const getComics = async (_, res) => {
  getPicturesByCategory("comics", res);
};

export const uploadPicture = async (req, res) => {
  try {
    await databaseFunctions.uploadPicture(
      req.body.pictureUrl,
      req.body.title,
      req.body.created,
      req.body.category,
      req.body.series,
      req.body.about,
      req.body.redraw,
      req.body.previewUrl
    );

    fs.rename(
      `${process.cwd()}/${req.body?.oldPictureUrl}`,
      `${process.cwd()}/pictures/${req.body?.category}/${
        req.body?.pictureName
      }`,
      function (err) {}
    );

    res.json({ message: "Picture successfully uploaded!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture uploading failed!" });
  }
};

export const updatePicture = async (req, res) => {
  try {
    const updated = await databaseFunctions.updatePicture(
      req.body.pictureUrl,
      req.body.title,
      req.body.created,
      req.body.category,
      req.body.series,
      req.body.about,
      req.body.redraw,
      req.body.previewUrl,
      req.params.id
    );

    fs.rename(
      `${process.cwd()}/${req.body?.oldPictureUrl}`,
      `${process.cwd()}/pictures/${req.body?.category}/${
        req.body?.pictureName
      }`,
      function (err) {}
    );

    req.body.pictureName;

    if (!updated.affectedRows) {
      return res.status(404).json({ message: "Picture id not found!" });
    }

    res.json({ message: "Picture successfully updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture updating process failed!" });
  }
};

export const deletePicture = async (req, res) => {
  try {
    const file = await databaseFunctions.getPictureById(req.params.id);
    const deleted = await databaseFunctions.deletePictureById(req.params.id);

    fs.unlink(`${process.cwd()}/${file[0].pictureUrl}`, function (err) {});

    if (!deleted.affectedRows) {
      return res.status(404).json({ message: "Picture id not found!" });
    }

    res.json({ message: "Picture successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture deletion process failed!" });
  }
};

export const deletePictureByUrl = async (req, res) => {
  try {
    fs.unlink(`${process.cwd()}/${req.body.oldPictureUrl}`, function (err) {});

    res.json({ message: "Picture successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture deletion process failed!" });
  }
};

function addPicturesToDB() {
  try {
    fs.readdir(`${process.cwd()}/pictures`, (err, subdirs) => {
      subdirs?.forEach((dir) => {
        fs.readdir(`${process.cwd()}/pictures/${dir}`, (err, files) => {
          files?.forEach(async (file) => {
            const pic = await databaseFunctions.getPictureByUrl(
              `/pictures/${dir}/${file}`
            );
            if (pic?.length == 0) {
              await databaseFunctions.uploadPicture(
                `/pictures/${dir}/${file}`,
                file.substring(8, file.length - 4),
                `${file.substring(0, 7)}-01`,
                dir,
                "stand-alone",
                null,
                "0",
                null
              );
            }
          });
        });
      });
    });
  } catch (err) {
    console.log("Something went wrong while updating picture DB!");
    console.log(err);
  }
}

async function removeDeletedPicturesFromDB() {
  const pictures = await databaseFunctions.getAllPictures();
  pictures.forEach((pic) => {
    try {
      fs.readFile(`${process.cwd()}${pic.pictureUrl}`, (err, data) => {
        if (err?.code === "ENOENT") {
          databaseFunctions.deletePictureByUrl(pic.pictureUrl);
        }
      });
    } catch (err) {
      console.log("Something went wrong while deleting image data from DB!");
      console.log(err);
    }
  });
}

export function updatePictureDB() {
  addPicturesToDB();
  removeDeletedPicturesFromDB();
}
