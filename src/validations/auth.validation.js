const { body } = require("express-validator");

/**
 * Register Validation
 */
const registerValidationRules = () => [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

/**
 * Login Validation
 */
const loginValidationRules = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

/**
 * Update Profile Validation
 *
 * Allows updating personal profile information
 * but NOT authentication or authorization fields.
 */
const updateProfileValidationRules = () => [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty."),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty."),

  body("phoneNumber")
    .optional()
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage("Invalid phone number"),

  body("profileImage")
    .optional()
    .trim()
    .isURL()
    .withMessage("Profile image must be a valid URL!"),
];

/**
 * Change Password Validation
 */
const changePasswordValidationRules = () => [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Current password must be at least 6 characters long"),

  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your new password")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match!");
      }

      return true;
    }),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  changePasswordValidationRules,
};
