import * as databaseFunctions from "../db/descriptionDatabaseQueries.js";

async function getDescriptionsByCategory(category, res) {
  try {
    const descriptions = await databaseFunctions.getDescriptionsByCategory(
      category
    );

    if (!descriptions) {
      res.status(404).json({ message: "Pictures not found!" });
    }
    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting post failed!" });
  }
}

async function getPageDescription(page, res) {
  try {
    const descriptions = await databaseFunctions.getPageDescription(page);

    if (!descriptions) {
      res.status(404).json({ message: "Pictures not found!" });
    }
    res.json(descriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting post failed!" });
  }
}

export const getArtDescription = async (_, res) => {
  getPageDescription("art", res);
};

export const getDevDescription = async (_, res) => {
  getPageDescription("dev", res);
};

export const getCGPaintRightDescription = async (_, res) => {
  getDescriptionsByCategory("cg-paint-right", res);
};

export const getCGPaintLeftDescription = async (_, res) => {
  getDescriptionsByCategory("cg-paint-left", res);
};

export const getCGGraphDescription = async (_, res) => {
  getDescriptionsByCategory("cg-graph", res);
};

export const getTradDescription = async (_, res) => {
  getDescriptionsByCategory("trad", res);
};

export const getComicsDescription = async (_, res) => {
  getDescriptionsByCategory("comics", res);
};
