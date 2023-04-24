import { body, validationResult } from "express-validator";

export const validationResultStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const pictureValidation = [
  body(
    "about",
    "Picture about section should be 255 symbols maximum!"
  ).isLength({ max: 255 }),
];
