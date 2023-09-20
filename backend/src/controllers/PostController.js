import * as databaseFunctions from "../db_queries/postDatabaseQueries.js";
import { paginatePosts } from "../utils/resProcessers.js";

export const getAllPosts = async (_, res) => {
  try {
    const posts = await databaseFunctions.getAllPosts();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting all posts failed!" });
  }
};

export const getAllPostsPaginated = async (_, res) => {
  try {
    const posts = await databaseFunctions.getAllPosts();

    res.json(paginatePosts(posts));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting all posts failed!" });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const postsPerPage = req.query.postsPerPage || 10;
    const page = req.query.page || 1;
    const posts = await databaseFunctions.getPostsByCategory(
      req.params.category
    );

    res.json(paginatePosts(posts));
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

    res.json({ message: "Post successfully uploaded!" });
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
    res.status(500).json({ message: "Post deletion failed!" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await databaseFunctions.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Getting post by id failed!" })
  }
}
