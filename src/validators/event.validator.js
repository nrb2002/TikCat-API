const { body } = require("express-validator");

/**
 * Create Event Validation
 */
const createEventValidationRules = () => [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Event description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category is required!")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("venueId")
    .notEmpty()
    .withMessage("Venue is required!")
    .isMongoId()
    .withMessage("Invalid venue ID!"),

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required!")
    .isISO8601()
    .withMessage("Invalid event date!")
    .custom((value) => new Date(value) > new Date())
    .withMessage("Event date must be in the future"),

  body("startTime").notEmpty().withMessage("Start time is required"),

  body("endTime").notEmpty().withMessage("End time is required"),

  body("ticketPrice")
    .notEmpty()
    .withMessage("Ticket price is required")
    .isFloat({ min: 0 })
    .withMessage("Ticket price cannot be negative"),

  body("totalTickets")
    .notEmpty()
    .withMessage("Total tickets is required")
    .isInt({ min: 1 })
    .withMessage("Total tickets must be at least 1"),

  body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),

  body("status")
    .optional()
    .isIn(["draft", "published", "cancelled"])
    .withMessage("Invalid event status"),

  body().custom((_, { req }) => {
    const { startTime, endTime } = req.body;

    if (startTime && endTime && startTime >= endTime) {
      throw new Error("Start time must be before end time");
    }

    return true;
  }),
];

/**
 * Update Event Validation
 */
const updateEventValidationRules = () => [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("eventDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid event date")
    .custom((value) => new Date(value) > new Date())
    .withMessage("Event date must be in the future"),

  body("ticketPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Ticket price cannot be negative"),

  body("totalTickets")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total tickets must be at least 1"),

  body("status")
    .optional()
    .isIn(["draft", "published", "cancelled"])
    .withMessage("Invalid event status"),
];

module.exports = {
  createEventValidationRules,
  updateEventValidationRules,
};
