const { body } = require("express-validator");

/**
 * Create Venue Validation
 */
const createVenueValidationRules = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Venue name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Venue name must be between 3 and 100 characters"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be greater than 0")
    .toInt(),

  body("contactPhone")
    .optional()
    .trim()
    .matches(/^[+0-9\s\-()]+$/)
    .withMessage("Invalid phone number format"),

  body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),
];

/**
 * Update Venue Validation
 */
const updateVenueValidationRules = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Venue name must be between 3 and 100 characters"),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("city").optional().trim().notEmpty().withMessage("City cannot be empty"),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be greater than 0")
    .toInt(),

  body("contactPhone")
    .optional()
    .trim()
    .matches(/^[+0-9\s\-()]+$/)
    .withMessage("Invalid phone number format"),

  body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),
];

module.exports = {
  createVenueValidationRules,
  updateVenueValidationRules,
};
