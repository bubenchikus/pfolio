import express from "express";
import cors from "cors";
import {
  PictureController,
  PostController,
  DescriptionController,
  AdminController,
} from "./controllers/index.js";
import { checkAuth } from "./auth.js";
import { validationResultStatus, pictureValidation } from "./valid.js";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/pictures", express.static("pictures"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `pictures/no-category`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(`/api/upload`, checkAuth, upload.single("image"), (req, res) => {
  res.json({ message: "Image succesfully uploaded" });
});

app.post(
  `/api/upload-preview`,
  checkAuth,
  upload.single("image"),
  (req, res) => {
    PictureController.placePreview(req.file.originalname);
    res.json({ message: "Image succesfully uploaded" });
  }
);

app.get("/api/art/cg-paint-left", PictureController.getCGPaintLeft);
app.get("/api/art/cg-paint-right", PictureController.getCGPaintRight);
app.get("/api/art/cg-graph", PictureController.getCGGraph);
app.get("/api/art/trad", PictureController.getTrad);
app.get("/api/art/comics", PictureController.getComics);

app.get(
  "/api/pages-descriptions",
  DescriptionController.getAllPagesDescriptions
);
app.get(
  "/api/pages-descriptions/:page",
  DescriptionController.getPageDescriptionByTitle
);
app.post(
  "/api/pages-descriptions",
  checkAuth,
  DescriptionController.uploadPageDescription
);
app.patch(
  "/api/pages-descriptions/:id",
  checkAuth,
  DescriptionController.updatePageDescription
);
app.delete(
  "/api/pages-descriptions/:id",
  checkAuth,
  DescriptionController.deletePageDescription
);

app.get(
  "/api/series-descriptions",
  DescriptionController.getAllSeriesDescriptions
);
app.post(
  "/api/series-descriptions",
  checkAuth,
  DescriptionController.uploadSeriesDescription
);
app.get(
  "/api/series-descriptions/:category",
  DescriptionController.getSeriesDescriptionsByCategory
);
app.patch(
  "/api/series-descriptions/:id",
  checkAuth,
  DescriptionController.updateSeriesDescription
);
app.delete(
  "/api/series-descriptions/:id",
  checkAuth,
  DescriptionController.deleteSeriesDescription
);

app.get("/api/pictures", PictureController.getUnhiddenPictures);
app.post(
  "/api/pictures",
  pictureValidation,
  validationResultStatus,
  checkAuth,
  PictureController.uploadPicture
);
app.patch("/api/pictures/:id", checkAuth, PictureController.updatePicture);
app.delete("/api/pictures/:id", checkAuth, PictureController.deletePicture);

app.get("/api/all-pictures", checkAuth, PictureController.getAllPictures);

app.get("/api/posts", PostController.getAllPosts);
app.post("/api/posts", checkAuth, PostController.uploadPost);
app.patch("/api/posts/:id", checkAuth, PostController.updatePost);
app.delete("/api/posts/:id", checkAuth, PostController.deletePost);

app.post("/api/login", AdminController.login);

app.get("/api/columns", checkAuth, AdminController.getColumns);

PictureController.maintainPictureDB();

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log("Server OK");
});
