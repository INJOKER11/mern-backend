import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Provide title for post").isLength({ min: 3 }).isString(),
  body("text", "Provide text for post").isLength({ min: 10 }).isString(),
  body("tags", "Provide an array of tags").optional().isString(),
  body("imageUrl", "Provide url of image").optional().isString(),
];
