import express from "express";
import cors from "cors";
import {
  PictureController,
  PostController,
  DescriptionController,
} from "./controllers/index.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/pictures", express.static("pictures"));

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
app.post("/pages-descriptions", DescriptionController.uploadPageDescription);
app.patch(
  "/pages-descriptions/:page",
  DescriptionController.updatePageDescription
);
app.delete(
  "/pages-descriptions/:page",
  DescriptionController.deletePageDescription
);

app.get("/series-descriptions", DescriptionController.getAllSeriesDescriptions);
app.post("/series-descriptions", DescriptionController.uploadSeriesDescription);
app.get(
  "/series-descriptions/:category",
  DescriptionController.getSeriesDescriptionsByCategory
);
app.patch(
  "/series-descriptions/:category/:series",
  DescriptionController.updateSeriesDescription
);
app.delete(
  "/series-descriptions/:category/:series",
  DescriptionController.deleteSeriesDescription
);

app.get("/pictures", PictureController.getAllPictures);
app.post("/pictures", PictureController.uploadPicture);
app.patch("/pictures/:id", PictureController.updatePicture);
app.delete("/pictures/:id", PictureController.deletePicture);

app.get("/posts", PostController.getAllPosts);
app.post("/posts", PostController.uploadPost);
app.patch("/posts/:id", PostController.updatePost);
app.delete("/posts/:id", PostController.deletePost);

PictureController.updatePictureDB();

app.listen(4444, (err) => {
  if (err) return console.log(err);
  console.log("Server OK");
});
