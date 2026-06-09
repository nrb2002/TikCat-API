const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  asyncHandler(authController.googleCallback)
);

// Logout (should be POST, not GET)
router.post(
  "/logout",
  asyncHandler(authController.logout)
);

module.exports = router;