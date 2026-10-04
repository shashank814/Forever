import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("name")
    .exists().withMessage("Name number is required").bail()
    .isString().withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Name length must be between 2 to 50 characters"),

  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a string")
    .trim()
    .isLength({ min: 6 }).withMessage("Password at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];


export const loginValidator = [
  body("email")
    .exists().withMessage("Email is required").bail()
    .isString().withMessage("Email must be a string").bail()
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a string").bail()
    .trim()
    .isLength({ min: 6 }).withMessage("Password at least 6 characters long"),

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