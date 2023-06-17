import express from "express";
import cors from "cors";
import {
  PictureController,
  PostController,
  PageDescriptionController,
  SeriesDescriptionController,
  AdminController,
} from "./src/controllers/index.js";
import { checkAuth } from "./src/middlewares/auth.js";
import {
  validationResultStatus,
  pictureValidation,
} from "./src/middlewares/valid.js";
import multer from "multer";
import dotenv from "dotenv";
import picturesMaintainer from "./src/utils/picturesMaintainer.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/pictures", express.static("pictures"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `pictures/no-category`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(`/upload`, checkAuth, upload.single("image"), (req, res) => {
  res.json({ message: "Image succesfully uploaded" });
});

app.post(`/upload-preview`, checkAuth, upload.single("image"), (req, res) => {
  PictureController.placePreview(req.file.originalname);
  res.json({ message: "Image succesfully uploaded" });
});

app.get("/art/cg-paint-left", PictureController.getCGPaintLeft);
app.get("/art/cg-paint-right", PictureController.getCGPaintRight);
app.get("/art/cg-graph", PictureController.getCGGraph);
app.get("/art/trad", PictureController.getTrad);
app.get("/art/comics", PictureController.getComics);

app.get(
  "/pages-descriptions",
  PageDescriptionController.getAllPagesDescriptions
);
app.get(
  "/pages-descriptions/:page",
  PageDescriptionController.getPageDescriptionByTitle
);
app.post(
  "/pages-descriptions",
  checkAuth,
  PageDescriptionController.uploadPageDescription
);
app.patch(
  "/pages-descriptions/:id",
  checkAuth,
  PageDescriptionController.updatePageDescription
);
app.delete(
  "/pages-descriptions/:id",
  checkAuth,
  PageDescriptionController.deletePageDescription
);

app.get(
  "/series-descriptions",
  SeriesDescriptionController.getAllSeriesDescriptions
);
app.post(
  "/series-descriptions",
  checkAuth,
  SeriesDescriptionController.uploadSeriesDescription
);
app.get(
  "/series-descriptions/:category",
  SeriesDescriptionController.getSeriesDescriptionsByCategory
);
app.patch(
  "/series-descriptions/:id",
  checkAuth,
  SeriesDescriptionController.updateSeriesDescription
);
app.delete(
  "/series-descriptions/:id",
  checkAuth,
  SeriesDescriptionController.deleteSeriesDescription
);

app.get("/pictures", PictureController.getUnhiddenPictures);
app.post(
  "/pictures",
  pictureValidation,
  checkAuth,
  validationResultStatus,
  PictureController.uploadPicture
);
app.patch("/pictures/:id", checkAuth, PictureController.updatePicture);
app.delete("/pictures/:id", checkAuth, PictureController.deletePicture);

app.get("/all-pictures", checkAuth, PictureController.getAllPictures);

app.get("/posts", PostController.getAllPosts);
app.post("/posts", checkAuth, PostController.uploadPost);
app.patch("/posts/:id", checkAuth, PostController.updatePost);
app.delete("/posts/:id", checkAuth, PostController.deletePost);

app.post("/login", AdminController.login);

app.get("/columns", checkAuth, AdminController.getColumns);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  try {
    picturesMaintainer();
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is Ok and running on the port ${process.env.PORT}...`);
});
