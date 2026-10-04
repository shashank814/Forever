import { body, validationResult } from "express-validator";

export const cartValidator = [
  body("productId")
    .exists()
    .withMessage("Product Id is required")
    .bail()
    .isString()
    .withMessage("Product Id must be a string")
    .bail()
    .isMongoId().withMessage("Product Id must be a valid Mongo ID"),

  body("quantity")
    .exists()
    .withMessage("Quantity is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantityen must be an integer greater than 0"),

  body("size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString().withMessage("Currency must be a string value").bail()
    .isIn([ "XS", "S", "M", "L", "XL", "XXL" ]).withMessage("Size must be XS, S, M, L, XL, XXL"),
    

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Data",
        errors: errors.array(),
      });
    }

    next();
  },
];
