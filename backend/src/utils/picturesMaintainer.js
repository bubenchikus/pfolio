import * as databaseFunctions from "../db_queries/pictureDatabaseQueries.js";
import fs from "fs";
import path from "path";
import config from "config";

async function removeDeletedPicturesFromDB() {
  const pictures = await databaseFunctions.getAllPictures();
  pictures.forEach((pic) => {
    try {
      fs.readFile(
        path.resolve("pictures", `${pic.category}`, `${pic.pictureName}`),
        (err, data) => {
          if (err?.code === "ENOENT") {
            databaseFunctions.deletePictureById(pic.id);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
}

async function removeDeletedPicturesFromFS() {
  try {
    fs.readdir(path.resolve("pictures"), (err, subdirs) => {
      subdirs?.forEach((dir) => {
        if (dir !== "previews") {
          fs.readdir(path.resolve("pictures", `${dir}`), (err, files) => {
            files?.forEach(async (file) => {
              const pic =
                await databaseFunctions.getPictureByCategoryAndPictureName(
                  dir,
                  file
                );
              if (pic?.length == 0) {
                fs.unlink(
                  path.resolve("pictures", `${dir}`, `${file}`),
                  (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                  }
                );
              }
            });
          });
        } else {
          fs.readdir(path.resolve("pictures", "previews"), (err, files) => {
            files?.forEach(async (file) => {
              const pic = await databaseFunctions.getPictureByPreviewName(
                file.slice(0, file.length - 5)
              );
              if (pic?.length == 0) {
                fs.unlink(
                  path.resolve("pictures", "previews", `${file}`),
                  (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                  }
                );
              }
            });
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

function createStorage() {
  var storageName = path.resolve("pictures");

  [storageName, path.resolve("pictures", "previews")].forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });

  config.get("categories.pictures").forEach((dir) => {
    storageName = path.resolve("pictures", `${dir}`);
    if (!fs.existsSync(storageName)) {
      fs.mkdirSync(storageName);
    }
  });
}

function maintainPictures() {
  removeDeletedPicturesFromDB();
  removeDeletedPicturesFromFS();
  createStorage();
}

export default maintainPictures;
