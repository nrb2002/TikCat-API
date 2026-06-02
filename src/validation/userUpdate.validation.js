const { body } = require("express-validator");

const userUpdateValidationRules = () => {
  return [
    body("firstName").optional().trim(),

    body("lastName").optional().trim(),

    body("username").optional().isLength({ min: 3, max: 30 }),

    body("email").optional().isEmail(),

    body("password").optional().isLength({ min: 6 }),

    body("role").optional().isIn(["Founder", "Investor", "Developer", "Admin"]),
  ];
};

module.exports = userUpdateValidationRules;
