import * as databaseFunctions from "../db_queries/descriptionDatabaseQueries.js";
import { arrangeSeries } from "../utils/resProcessers.js";

export const getSeriesDescriptionsByCategory = async (req, res) => {
  try {
    const descriptions = await databaseFunctions.getDescriptionsByCategory(
      req.params.category
    );

    res.json(arrangeSeries(descriptions));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting series descriptions failed (by category)!" });
  }
};

export const getAllSeriesDescriptions = async (_, res) => {
  try {
    const descriptions = await databaseFunctions.getAllSeriesDescriptions();

    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting all series descriptions failed!" });
  }
};

export const uploadSeriesDescription = async (req, res) => {
  try {
    await databaseFunctions.uploadDescription(
      req.body.txt,
      req.body.category,
      req.body.series,
      req.body.arrangement
    );

    res.json({ message: "Series description successfully uploaded!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Series description uploading failed!" });
  }
};

export const updateSeriesDescription = async (req, res) => {
  try {
    await databaseFunctions.updateDescription(
      req.body.txt,
      req.body.category,
      req.body.series,
      req.body.arrangement,
      req.params.id
    );

    await databaseFunctions.updatePicturesSeries(
      req.body.oldSeries,
      req.body.series,
      req.body.category
    );

    res.json({ message: "Series description successfully updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Series description updating failed!" });
  }
};

export const deleteSeriesDescription = async (req, res) => {
  try {
    const deleted = await databaseFunctions.deleteDescription(req.params.id);

    res.json({ message: "Series description successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Series description deletion failed!" });
  }
};
