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

export const uploadPost = async (req, res) => {
  try {
    await databaseFunctions.uploadPost(
      req.body.title,
      req.body.txt,
      req.body.category
    );

    res.json({ message: "Post succesfully uploaded!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Post uploading failed!" });
  }
};

export const updatePost = async (req, res) => {
  try {
    await databaseFunctions.updatePost(
      req.body.title,
      req.body.txt,
      req.body.category,
      req.params.id
    );

    res.json({ message: "Post successfully updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Post updating failed!" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await databaseFunctions.deletePost(req.params.id);

    res.json({ message: "Post successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Post deletion process failed!" });
  }
};
