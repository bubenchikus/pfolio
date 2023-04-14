import * as databaseFunctions from "../db/postDatabaseQueries.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await databaseFunctions.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting all posts failed!" });
  }
};

export const getPostsByCategory = async (req, res, category) => {
  try {
    const posts = await databaseFunctions.getPostsByCategory(category);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting posts by category failed!" });
  }
};
