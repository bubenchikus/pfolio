import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "config";

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
    console.log(err);
    res.status(500).json({ message: "Authorization failed!" });
  }
};

// getting columns for admin panel pictures datagrid
export const getColumns = async (_, res) => {
  try {
    res.json({
      pictures: config.get("columns.pictures"),
      "pictures-categories": config.get("categories.pictures"),
      "posts-categories": config.get("categories.posts"),
      posts: config.get("columns.posts"),
      "series-descriptions": config.get("columns.series-descriptions"),
      "pages-descriptions": config.get("columns.pages-descriptions"),
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting columns for admin panel failed!" });
  }
};
