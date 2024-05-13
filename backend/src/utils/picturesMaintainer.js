import * as databaseFunctions from "../db_queries/pictureDatabaseQueries.js";
import fs from "fs";
import path from "path";
import { standardError } from "./universalHelpers.js";
import * as schemaDatabaseFunctions from "../db_queries/informationSchemaQueries.js";

// Delete pictures present in DB but not in FS
async function removeDeletedPicturesFromDB() {
  const pictures = await databaseFunctions.getAllPictures();

  if (pictures) {
    pictures.forEach((pic) => {
      fs.readFile(
        path.resolve("pictures", `${pic.category}`, `${pic.pictureName}`),
        (err) => {
          if (err && err.code === "ENOENT") {
            databaseFunctions.deletePictureById(pic.id);
          } else {
            standardError(err);
          }
        }
      );
    });
  }
}

// Delete pictures present in FS but not in DB
async function removeDeletedPicturesFromFS() {
  fs.readdir(path.resolve("pictures"), (err, subdirs) => {
    standardError(err);

    if (subdirs) {
      subdirs.forEach((dir) => {
        if (dir !== "previews") {
          fs.readdir(path.resolve("pictures", `${dir}`), (err, files) => {
            standardError(err);

            if (files) {
              files.forEach(async (file) => {
                const pic =
                  await databaseFunctions.getPictureByCategoryAndPictureName(
                    dir,
                    file
                  );

                if (pic && pic.length == 0) {
                  fs.unlink(
                    path.resolve("pictures", `${dir}`, `${file}`),
                    (err) => standardError(err)
                  );
                }
              });
            }
          });
        } else {
          fs.readdir(path.resolve("pictures", "previews"), (err, files) => {
            standardError(err);

            if (files) {
              files.forEach(async (file) => {
                const pic = await databaseFunctions.getPictureByPreviewName(
                  file.replace(/\.[^/.]+$/, "") // trim extention
                );

                if (pic && pic.length == 0) {
                  fs.unlink(
                    path.resolve("pictures", "previews", `${file}`),
                    (err) => standardError(err)
                  );
                }
              });
            }
          });
        }
      });
    }
  });
}

// Setup necessary archive folders if they don't exist yet
async function createStorage() {
  var storageName = path.resolve("pictures");

  [storageName, path.resolve("pictures", "previews")].forEach((path) => {
    fs.access(path, (err) => {
      standardError(err);

      fs.mkdir(path, (err) => {
        if (err && err.code != "EEXIST") {
          console.error(err);
          return;
        }
      });
    });
  });

  (await schemaDatabaseFunctions.getPicturesCategories()).forEach((dir) => {
    storageName = path.resolve("pictures", `${dir}`);

    if (!fs.existsSync(storageName)) {
      fs.mkdir(storageName, (err) => {
        if (err && err.code != "EEXIST") {
          console.error(err);
          return;
        }
      });
    }
  });
}

function maintainPictures() {
  // removeDeletedPicturesFromDB(); //<--- It's unsafe to use these functions until final project deployment.
  // removeDeletedPicturesFromFS();
  createStorage();
}

export default maintainPictures;
