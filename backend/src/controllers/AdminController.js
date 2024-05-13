import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as databaseFunctions from "../db_queries/informationSchemaQueries.js";

dotenv.config();

function createToken() {
  return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const login = async (req, res) => {
  try {
    const isValid =
      req.body.username == process.env.ADMIN_U &&
      req.body.password == process.env.ADMIN_P;

    if (!isValid) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    res.json({ token: createToken() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authorization failed!" });
  }
};

export const getColumns = async (_, res) => {
  try {
    res.json({
      "pictures-categories": await databaseFunctions.getPicturesCategories(),
      "posts-categories": await databaseFunctions.getPostsCategories(),
      pictures: await databaseFunctions.getPicturesColumnsNames(),
      posts: await databaseFunctions.getPostsColumnsNames(),
      "series-descriptions": await databaseFunctions.getSeriesDescriptionsColumnsNames(),
      "pages-descriptions": ["id", "txt", "page"],
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Getting columns for admin panel failed!" });
  }
};
