const { body } = require("express-validator");

const startupValidationRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Startup name is required"),

    body("description")
      .notEmpty()
      .isString()
      .trim()
      .withMessage("Description is required"),

    body("industry")
      .notEmpty()
      .isString()
      .trim()
      .withMessage("Industry is required"),

    body("founders")
      .isArray({ min: 1 })
      .withMessage("Founders must be an array"),

    body("founders.*")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("Each founder must be a string"),

    body("foundedYear")
      .isInt({
        min: 1900,
        max: new Date().getFullYear(),
      })
      .withMessage("Founded year must be valid"),

    body("location")
      .notEmpty()
      .isObject()
      .withMessage("Location must be an object"),

    body("phone").notEmpty().isString().withMessage("Phone is required"),
  ];
};

module.exports = startupValidationRules;
