import * as databaseFunctions from "../db_queries/descriptionDatabaseQueries.js";

export const getAllPagesDescriptions = async (_, res) => {
  try {
    const descriptions = await databaseFunctions.getDescriptionsByCategory(
      "page"
    );

    const processedDescriptions = descriptions?.map((el) => {
      return { id: el.id, page: el.series, txt: el.txt };
    });

    res.json(processedDescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Getting all pages descriptions failed!" });
  }
};

export const getPageDescriptionByTitle = async (req, res) => {
  try {
    const descriptions = await databaseFunctions.getPageDescription(
      req.params.page
    );

    res.json(descriptions[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Getting page description failed (by title)!" });
  }
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
    console.error(err);
    res.status(500).json({ message: "Page description uploading failed!" });
  }
};

export const updatePageDescription = async (req, res) => {
  try {
    await databaseFunctions.updateDescription(
      req.body.txt,
      "page",
      req.body.page,
      req.body.arrangement,
      req.params.id
    );

    res.json({ message: "Page description successfully updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Page description updating failed!" });
  }
};

export const deletePageDescription = async (req, res) => {
  try {
    await databaseFunctions.deleteDescription(req.params.id);

    res.json({ message: "Page description successfully deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Page description deletion failed!" });
  }
};
