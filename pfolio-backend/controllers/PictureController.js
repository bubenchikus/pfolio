import fs from "fs";
import * as databaseFunctions from "../db/pictureDatabaseQueries.js";

async function getPicturesByCategory(category, res) {
  try {
    const pictures = await databaseFunctions.getPicturesByCategory(category);

    if (!pictures) {
      res.status(404).json({ message: "Pictures not found!" });
    }
    res.json(pictures);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting post failed!" });
  }
}

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
              await databaseFunctions.insertPicture(
                `/pictures/${dir}/${file}`,
                file.substring(8, file.length - 4),
                `${file.substring(0, 7)}-01`,
                dir
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
