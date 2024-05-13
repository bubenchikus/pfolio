import * as databaseFunctions from "../db_queries/postDatabaseQueries.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = req.query.page
      ? await databaseFunctions.getAllPostsByPage(req.query.page)
      : await databaseFunctions.getAllPosts();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Getting all posts failed!" });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const posts = await databaseFunctions.getPostsByCategory(
      req.params.category,
      req.query.page
    );

    res.json(posts);
  } catch (err) {
    console.error(err);
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

    res.json({ message: "Post successfully uploaded!" });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: "Post updating failed!" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await databaseFunctions.deletePost(req.params.id);

    res.json({ message: "Post successfully deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Post deletion failed!" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await databaseFunctions.getPostById(req.params.id);
    res.json(post[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Getting post by id failed!" });
  }
};
