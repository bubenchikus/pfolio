import multer from "multer";
import fs from "fs";
import path from "path";

function placePreview(pictureName) {
  if (pictureName) {
    fs.rename(
      path.resolve("pictures", "no-category", `${pictureName}`),
      path.resolve("pictures", "previews", `${pictureName}`),
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
      }
    );
  }
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `pictures/no-category`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("image");

export const uploadPicture = (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      res.json({ message: "Image succesfully uploaded" });
    } else {
      res.json({ message: "Image uploading failed!" });
    }
  });
};
export const uploadPreview = (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      placePreview(req.file.originalname);
      res.json({ message: "Preview succesfully uploaded" });
    } else {
      res.json({ message: "Preview uploading failed!" });
    }
  });
};
