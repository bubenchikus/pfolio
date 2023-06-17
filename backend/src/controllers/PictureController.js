import fs from "fs";
import path from "path";
import * as databaseFunctions from "../db_queries/pictureDatabaseQueries.js";

const renamePicture = (req, res) => {
  fs.rename(
    path.resolve(
      "pictures",
      `${req.body.oldCategory}`,
      `${req.body.oldPictureName}`
    ),
    path.resolve("pictures", `${req.body.category}`, `${req.body.pictureName}`),
    (err) => {
      console.log(err);
      return res.status(500).json({ message: "Picture renaming failed!" });
    }
  );
};

export const getAllPictures = async (_, res) => {
  try {
    const pictures = await databaseFunctions.getAllPictures();

    res.json(pictures);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting all pictures failed!" });
  }
};

export const getUnhiddenPictures = async (_, res) => {
  try {
    const pictures = await databaseFunctions.getUnhiddenPictures();

    res.json(pictures);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting unhidden pictures failed!" });
  }
};

async function getPicturesByCategory(category, res) {
  try {
    const pictures = await databaseFunctions.getPicturesByCategory(category);

    res.json(pictures);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting pictures failed (by category)!" });
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

export const uploadPicture = async (req, res) => {
  try {
    await databaseFunctions.uploadPicture(
      req.body.title,
      req.body.created,
      req.body.category,
      req.body.pictureName,
      req.body.previewName,
      req.body.series,
      req.body.about,
      req.body.redraw,
      req.body.hide
    );

    renamePicture(req, res);

    res.json({ message: "Picture successfully uploaded!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture uploading failed!" });
  }
};

export const updatePicture = async (req, res) => {
  try {
    await databaseFunctions.updatePicture(
      req.body.title.trim() === "" ? null : req.body.title.trim(), // COALESCE doesn't work with empty strings
      req.body.created,
      req.body.category,
      req.body.pictureName,
      req.body.previewName,
      req.body.series.trim() === "" ? null : req.body.series.trim(),
      req.body.about,
      req.body.redraw,
      req.body.hide,
      req.params.id
    );

    renamePicture(req, res);

    res.json({ message: "Picture updating failed!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture updating failed!" });
  }
};

export const deletePicture = async (req, res) => {
  try {
    const files = await databaseFunctions.getPictureById(req.params.id);

    if (!files[0]) {
      console.log(err);
      res.status(404).json({ message: "File was not found!" });
    }

    fs.unlink(
      path.resolve(
        "pictures",
        `${files[0].category}`,
        `${files[0].pictureName}`
      ),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message:
              "Picture deletion failed! It will be cleaned on server restart.",
          });
        }
      }
    );

    if (files[0].previewName) {
      fs.unlink(
        path.resolve("pictures", "previews", `${files[0].previewName}.webp`),
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message:
                "Preview deletion failed! It will be cleaned on server restart.",
            });
          }
        }
      );
    }

    await databaseFunctions.deletePictureById(req.params.id);

    res.json({ message: "Picture successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture deletion failed!" });
  }
};

export function placePreview(pictureName) {
  try {
    fs.rename(
      path.resolve("pictures", "no-category", `${pictureName}`),
      path.resolve("pictures", "previews", `${pictureName}`),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Picture renaming failed!",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong while renaiming picture!" });
  }
}
