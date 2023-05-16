import * as databaseFunctions from "../db/descriptionDatabaseQueries.js";

async function getPageDescription(page, res) {
  try {
    const descriptions = await databaseFunctions.getPageDescription(page);

    if (!descriptions) {
      res.status(404).json({ message: "Page description not found!" });
    }
    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting page description failed!" });
  }
}

export const getSeriesDescriptionsByCategory = async (req, res) => {
  try {
    const descriptions = await databaseFunctions.getDescriptionsByCategory(
      req.params.category
    );

    if (!descriptions) {
      return res
        .status(404)
        .json({ message: "Descriptions not found (by category)!" });
    }

    if (req.params.category == "page") {
      var processedDescriptions = [];
      descriptions.forEach((el) =>
        processedDescriptions.push({ id: el.id, page: el.series, txt: el.txt })
      );
      return res.json(processedDescriptions);
    }

    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting descriptions failed (by category)!" });
  }
};

export const getAllPagesDescriptions = async (req, res) => {
  req.params.category = "page";
  getSeriesDescriptionsByCategory(req, res);
};

export const getPageDescriptionByTitle = async (req, res) => {
  getPageDescription(req.params.page, res);
};

export const uploadPageDescription = async (req, res) => {
  try {
    await databaseFunctions.uploadDescription(
      req.body.txt,
      "page",
      req.body.page
    );

    res.json({ message: "Page description successfully uploaded!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Page description uploading failed!" });
  }
};

export const updatePageDescription = async (req, res) => {
  try {
    const updated = await databaseFunctions.updateDescription(
      req.body.txt,
      "page",
      req.body.page,
      req.params.id
    );

    if (!updated.affectedRows) {
      return res
        .status(404)
        .json({ message: "Description not found (by id)!" });
    }

    res.json({ message: "Page description successfully updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Page description updating failed!" });
  }
};

export const deletePageDescription = async (req, res) => {
  try {
    const deleted = await databaseFunctions.deleteDescription(req.params.id);

    if (!deleted.affectedRows) {
      return res
        .status(404)
        .json({ message: "Description not found (by id)!" });
    }

    res.json({ message: "Page description successfully deleted!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Page description deletion process failed!" });
  }
};

export const getAllSeriesDescriptions = async (_, res) => {
  try {
    const descriptions = await databaseFunctions.getAllSeriesDescriptions();

    if (!descriptions) {
      return res
        .status(404)
        .json({ message: "Description not found (by series)!" });
    }

    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting series descriptions failed!" });
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
    const updated = await databaseFunctions.updateDescription(
      req.body.txt,
      req.body.category,
      req.body.series,
      req.body.arrangement,
      req.params.id
    );

    if (!updated.affectedRows) {
      return res
        .status(404)
        .json({ message: "Description not found (by id)!" });
    }

    await databaseFunctions.updatePicturesSeries(
      req.body.oldSeries,
      req.body.series
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

    if (!deleted.affectedRows) {
      return res
        .status(404)
        .json({ message: "Description not found (by id)!" });
    }

    res.json({ message: "Series description successfully deleted!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Series description deletion process failed!" });
  }
};
