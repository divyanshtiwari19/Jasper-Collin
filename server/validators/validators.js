const { body } = require("express-validator");

// Auth
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

// Product
exports.validateProduct = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];
