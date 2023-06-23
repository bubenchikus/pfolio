import fs from "fs";
import path from "path";
import * as databaseFunctions from "../db_queries/pictureDatabaseQueries.js";
import { standardError } from "../utils/universalHelpers.js";
import { processPictures } from "../utils/resProcessers.js";

const renamePicture = (req) => {
  if (req.body.oldCategory && req.body.oldPictureName) {
    fs.rename(
      path.resolve(
        "pictures",
        `${req.body.oldCategory}`,
        `${req.body.oldPictureName}`
      ),
      path.resolve(
        "pictures",
        `${req.body.category}`,
        `${req.body.pictureName}`
      ),
      (err) => standardError(err)
    );
  }
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

export const getPicturesByCategory = async (req, res) => {
  try {
    const pictures = await databaseFunctions.getPicturesByCategory(
      req.params.category
    );

    res.json(processPictures(pictures));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting pictures failed (by category)!" });
  }
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

    const picture = await databaseFunctions.getPictureByCategoryAndPictureName(
      req.body.category,
      req.body.pictureName
    );

    res.json(picture);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Picture uploading failed!" });
  }
};

export const updatePicture = async (req, res) => {
  try {
    await databaseFunctions.updatePicture(
      req.body.title === "" ? null : req.body.title,
      req.body.created,
      req.body.category,
      req.body.pictureName,
      req.body.previewName,
      req.body.series === "" ? null : req.body.series,
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
      (err) => standardError(err)
    );

    if (files[0].previewName) {
      fs.unlink(
        path.resolve("pictures", "previews", `${files[0].previewName}.webp`),
        (err) => standardError(err)
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
  if (pictureName) {
    fs.rename(
      path.resolve("pictures", "no-category", `${pictureName}`),
      path.resolve("pictures", "previews", `${pictureName}`),
      (err) => standardError(err)
    );
  }
}
