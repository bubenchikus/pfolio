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
app.use("/texts", express.static("texts"));

app.get("/dev", DescriptionController.getDevDescription);
// app.get("/dev/:project");

app.get("/art", DescriptionController.getArtDescription);
app.get("/art/cg-paint-left", PictureController.getCGPaintLeft);
app.get(
  "/art/cg-paint-left/description",
  DescriptionController.getCGPaintLeftDescription
);
app.get("/art/cg-paint-right", PictureController.getCGPaintRight);
app.get(
  "/art/cg-paint-right/description",
  DescriptionController.getCGPaintRightDescription
);
app.get("/art/cg-graph", PictureController.getCGGraph);
app.get(
  "/art/cg-graph/description",
  DescriptionController.getCGGraphDescription
);
app.get("/art/trad", PictureController.getTrad);
app.get("/art/trad/description", DescriptionController.getTradDescription);
app.get("/art/comics", PictureController.getComics);
app.get("/art/comics/description", DescriptionController.getComicsDescription);

app.get("/about", DescriptionController.getAbout);

app.get("/journal", PostController.getAllPosts);
app.get("/journal/:category", PostController.getPostsByCategory);

PictureController.updatePictureDB();

app.listen(4444, (err) => {
  if (err) return console.log(err);
  console.log("Server OK");
});
