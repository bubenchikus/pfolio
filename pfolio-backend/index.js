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

const app = express();
app.use(express.json());

app.use(cors());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `pictures/no-category`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/pictures", express.static("pictures"));

app.post(`/upload`, checkAuth, upload.single("image"), (req, res) => {
  res.json({ message: "Image succesfully uploaded" });
});

app.get("/art/cg-paint-left", PictureController.getCGPaintLeft);
app.get("/art/cg-paint-right", PictureController.getCGPaintRight);
app.get("/art/cg-graph", PictureController.getCGGraph);
app.get("/art/trad", PictureController.getTrad);
app.get("/art/comics", PictureController.getComics);

app.get("/pages-descriptions", DescriptionController.getAllPagesDescriptions);
app.get(
  "/pages-descriptions/:page",
  DescriptionController.getPageDescriptionByTitle
);
app.post(
  "/pages-descriptions",
  checkAuth,
  DescriptionController.uploadPageDescription
);
app.patch(
  "/pages-descriptions/:id",
  checkAuth,
  DescriptionController.updatePageDescription
);
app.delete(
  "/pages-descriptions/:id",
  checkAuth,
  DescriptionController.deletePageDescription
);

app.get("/series-descriptions", DescriptionController.getAllSeriesDescriptions);
app.post(
  "/series-descriptions",
  checkAuth,
  DescriptionController.uploadSeriesDescription
);
app.get(
  "/series-descriptions/:category",
  DescriptionController.getSeriesDescriptionsByCategory
);
app.patch(
  "/series-descriptions/:id",
  checkAuth,
  DescriptionController.updateSeriesDescription
);
app.delete(
  "/series-descriptions/:id",
  checkAuth,
  DescriptionController.deleteSeriesDescription
);

app.get("/pictures", PictureController.getAllPictures);
app.post(
  "/pictures",
  pictureValidation,
  validationResultStatus,
  checkAuth,
  PictureController.uploadPicture
);
app.patch("/pictures/:id", checkAuth, PictureController.updatePicture);
app.delete("/pictures/:id", checkAuth, PictureController.deletePicture);

app.get("/posts", PostController.getAllPosts);
app.post("/posts", checkAuth, PostController.uploadPost);
app.patch("/posts/:id", checkAuth, PostController.updatePost);
app.delete("/posts/:id", checkAuth, PostController.deletePost);

app.post("/login", AdminController.login);

app.get("/columns", checkAuth, AdminController.getColumns);

PictureController.maintainPictureDB();

app.listen(4444, (err) => {
  if (err) return console.log(err);
  console.log("Server OK");
});
