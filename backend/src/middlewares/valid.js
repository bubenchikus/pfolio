import { body, validationResult } from "express-validator";
import * as databaseFunctions from "../db_queries/informationSchemaQueries.js";

export const validationResultStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

// Using optional() where db handles defaults by itself
export const pictureValidation = [
  body("title")
    .isString()
    .withMessage("Picture's title must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Picture's title must be 255 symbols maximum!")
    .optional({ nullable: true }),
  body("about")
    .optional({ nullable: true })
    .isString()
    .withMessage("Picture's about must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Picture's about must be 255 symbols maximum!"),
  body("category")
    .isIn(await databaseFunctions.getPicturesCategories())
    .withMessage("Picture's category must be in categories list!"),
  body("pictureName")
    .isString()
    .withMessage("Picture's pictureName must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Picture's pictureName must be 255 symbols maximum!"),
  body("previewName")
    .isString()
    .withMessage("Picture's previewName must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Picture's previewName must be 255 symbols maximum!"),
  body("series")
    .isString()
    .withMessage("Picture's series must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Picture's series must be 255 symbols maximum!"),
  body("created")
    .isString()
    .withMessage("Picture's Created must be a string!")
    .matches(/^\d{4}-\d{1,2}$/)
    .withMessage("Picture's created must match xxxx-xx pattern!")
    .optional({ nullable: true }),
  body("redraw")
    .isBoolean()
    .withMessage("Picture's redraw must be boolean!")
    .optional({ nullable: true }),
  body("hide")
    .isBoolean()
    .withMessage("Picture's redraw must be boolean!")
    .optional({ nullable: true }),
];

export const seriesDescriptionValidation = [
  body("txt")
    .isString()
    .withMessage("Series description's txt must be a string!")
    .trim()
    .isLength({ max: 65535 })
    .withMessage("Series description's txt must be 65,535 symbols maximum!")
    .optional({ nullable: true }),
  body("category")
    .isIn(await databaseFunctions.getPicturesCategories())
    .withMessage("Series descriptions's category must be in categories list!"),
  body("series")
    .isString()
    .withMessage("Series description's series must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Series description's series must be 255 symbols maximum!"),
  body("arrangement")
    .isInt()
    .withMessage("Series description's arrangement must be an int number!")
    .optional({ nullable: true }),
];

export const pageDescriptionValidation = [
  body("page")
    .isString()
    .withMessage("Page description's page name must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Page description's page name must be 255 symbols maximum!"),
  body("txt")
    .isString()
    .withMessage("Page description's txt must be a string!")
    .trim()
    .isLength({ max: 65535 })
    .withMessage("Page description's txt must be 65,535 symbols maximum!"),
];

export const postValidation = [
  body("title")
    .isString()
    .withMessage("Post's title must be a string!")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Post's title must be 255 symbols maximum!"),
  body("txt")
    .isString()
    .withMessage("Posts's txt must be a string!")
    .trim()
    .isLength({ max: 65535 })
    .withMessage("Posts's txt must be 65,535 symbols maximum!"),
  body("category")
    .isIn(await databaseFunctions.getPostsCategories())
    .withMessage("Post's category must be in categories list!")
    .optional({ nullable: true }),
];
