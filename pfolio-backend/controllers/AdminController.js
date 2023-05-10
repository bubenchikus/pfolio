import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

function createToken() {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
}

export const login = async (req, res) => {
  try {
    const isValid =
      req.body.username == process.env.ADMIN_U &&
      req.body.password == process.env.ADMIN_P;

    if (!isValid) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const token = createToken();

    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Authorization failed!" });
  }
};

export const getColumns = async (_, res) => {
  try {
    res.json({
      pictures: JSON.parse(process.env.DB_COLUMNS_PICTURES),
      "pictures-categories": JSON.parse(process.env.DB_CATEGORIES_PICTURES),
      posts: JSON.parse(process.env.DB_COLUMNS_POSTS),
      "series-descriptions": JSON.parse(
        process.env.DB_COLUMNS_SERIES_DESCRIPTIONS
      ),
      "pages-descriptions": JSON.parse(
        process.env.DB_COLUMNS_PAGES_DESCRIPTIONS
      ),
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Getting columns for admin panel failed!" });
  }
};
