import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authentication || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "No access (verification failed)!" });
    }
  } else {
    return res.status(403).json({ message: "No access!" });
  }
};
