const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Google OAuth redirect
router.get(
  "/google",
  /*
    #swagger.tags = ['Google Authentication (For browser use only)']
    #swagger.summary = 'Redirect to Google OAuth'
    #swagger.description = 'Initiates Google OAuth2 login flow. Redirects user to Google consent screen.'
  */
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Google callback URL
router.get(
  "/google/callback",
  /*
    #swagger.tags = ['Google Authentication (For browser use only)']
    #swagger.summary = 'Google OAuth callback'
    #swagger.description = 'Handles Google OAuth callback and returns authenticated user data + token.'

    #swagger.responses[200] = {
      description: 'Authentication successful',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              message: { type: "string", example: "Login successful" },
              token: { type: "string", example: "jwt_token_here" },
              user: {
                type: "object",
                properties: {
                  id: { type: "string", example: "64f1c2..." },
                  email: { type: "string", example: "user@gmail.com" },
                  name: { type: "string", example: "John Doe" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[401] = {
      description: 'Authentication failed'
    }
  */
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  asyncHandler(authController.googleCallback),
);

// Logout route
router.post(
  "/logout",
  /*
    #swagger.tags = ['Google Authentication (For browser use only)']
    #swagger.summary = 'Logout user'
    #swagger.description = 'Logs out the authenticated user (JWT or session-based).'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: 'Logout successful',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              message: { type: "string", example: "Logged out successfully" }
            }
          }
        }
      }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized - user not authenticated'
    }
  */
  asyncHandler(authController.logout),
);

module.exports = router;