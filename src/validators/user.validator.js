const { body } = require("express-validator");

/**
 * Register Validation
 */
const registerValidationRules = () => [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

/**
 * Login Validation
 */
const loginValidationRules = () => [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * Update Profile Validation
 */
const updateProfileValidationRules = () => [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  body("phoneNumber")
    .optional()
    .matches(/^[+0-9\s\-()]+$/)
    .withMessage("Invalid phone number"),

  body("profileImage")
    .optional()
    .trim()
    .isURL()
    .withMessage("Profile image must be a valid URL"),
];

/**
 * Change Password Validation
 */
const changePasswordValidationRules = () => [
  body("currentPassword")
    .notEmpty()
    .withMessage("Please enter your current password!"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required!")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long!"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your new password")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords do not match!"),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  changePasswordValidationRules,
};
