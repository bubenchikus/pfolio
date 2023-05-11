import fs from "fs";
import * as databaseFunctions from "../db/pictureDatabaseQueries.js";

import dotenv from "dotenv";
dotenv.config();

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
      req.body.title,
      req.body.created,
      req.body.category,
      req.body.pictureName,
      req.body.series,
      req.body.about,
      req.body.redraw,
      req.body.previewUrl
    );

    fs.rename(
      `${process.cwd()}/pictures/${req.body.oldCategory}/${
        req.body.oldPictureName
      }`,
      `${process.cwd()}/pictures/${req.body.category}/${req.body.pictureName}`,
      function (err) {}
    );

    const picture = await databaseFunctions.getPictureByCategoryAndPictureName(
      req.body.category,
      req.body.pictureName
    );

    if (!picture) {
      return res
        .status(404)
        .json({ message: "Uploaded picture not found in db!" });
    }

    res.json(picture);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture uploading failed!" });
  }
};

export const updatePicture = async (req, res) => {
  try {
    const updated = await databaseFunctions.updatePicture(
      req.body.title,
      req.body.created,
      req.body.category,
      req.body.pictureName,
      req.body.series,
      req.body.about,
      req.body.redraw,
      req.body.previewUrl,
      req.params.id
    );

    fs.rename(
      `${process.cwd()}/pictures/${req.body.oldCategory}/${
        req.body.oldPictureName
      }`,
      `${process.cwd()}/pictures/${req.body.category}/${req.body?.pictureName}`,
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

    fs.unlink(
      `${process.cwd()}/pictures/${file[0].category}/${file[0].pictureName}`,
      function (err) {}
    );

    if (!deleted.affectedRows) {
      return res.status(404).json({ message: "Picture id not found!" });
    }

    res.json({ message: "Picture successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture deletion process failed!" });
  }
};

async function removeDeletedPicturesFromDB() {
  const pictures = await databaseFunctions.getAllPictures();
  pictures.forEach((pic) => {
    try {
      fs.readFile(
        `${process.cwd()}/pictures/${pic.category}/${pic.pictureName}`,
        (err, data) => {
          if (err?.code === "ENOENT") {
            databaseFunctions.deletePictureById(pic.id);
          }
        }
      );
    } catch (err) {
      console.log("Something went wrong while deleting image data from DB!");
      console.log(err);
    }
  });
}

function createStorage() {
  var storageName = `${process.cwd()}/pictures/`;

  if (!fs.existsSync(storageName)) {
    fs.mkdirSync(storageName);
  }

  storageName = `${storageName}/no-category`;

  if (!fs.existsSync(storageName)) {
    fs.mkdirSync(storageName);
  }

  JSON.parse(process.env.DB_CATEGORIES_PICTURES).forEach((dir) => {
    storageName = `${process.cwd()}/pictures/${dir}`;
    if (!fs.existsSync(storageName)) {
      fs.mkdirSync(storageName);
    }
  });
}

export function maintainPictureDB() {
  removeDeletedPicturesFromDB();
  createStorage();
}
