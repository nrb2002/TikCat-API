const { body } = require("express-validator");

const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),

  body("description")
    .notEmpty()
    .withMessage("Category description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must be 5-255 characters"),
];

const updateCategoryValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must be 5-255 characters"),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
};
