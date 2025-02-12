const { body } = require("express-validator");

exports.validateRegister = [
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),
  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters"),
  body("username")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Username must be between 5 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Username must be between 5 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("password").notEmpty().withMessage("Password is required"),
];
