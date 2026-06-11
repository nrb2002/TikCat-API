const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

/********************************************
 * GOOGLE SIGNUP/LOGIN ROUTES
 * /************************************** */

// Google OAuth redirect
router.get(
  "/google",
  /*
    #swagger.tags = ['Google Auth (Frontend users only.)']
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
    #swagger.tags = ['Google Auth (Frontend users only.)']
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

/********************************************
 * LOCAL SIGNUP/LOGIN ROUTES
 * /************************************** */

//Register user
router.post(
  "/register",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register a new user'
    #swagger.description = 'Creates a new user account and returns a JWT token.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'User registration data',
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123',
        $ref: '#/definitions/RegisterRequest'
      }
    }

    #swagger.responses[201] = {
      description: 'User registered successfully'
    }

    #swagger.responses[409] = {
      description: 'Email already exists'
    }
  */

  asyncHandler(authController.register)
);

// Login user
router.post(
  "/login",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login user'
    #swagger.description = 'Authenticates user and returns JWT token.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'User credentials',
      schema: {
        email: 'john@example.com',
        password: 'Password123',
        role: 'Attendee',
        $ref: '#/definitions/LoginRequest'
      }
    }

    #swagger.responses[200] = {
      description: 'Login successful'
    }

    #swagger.responses[401] = {
      description: 'Invalid credentials'
    }
  */

  asyncHandler(authController.login)
);

router.get(
  "/me",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Get current authenticated user'
    #swagger.description = 'Returns the profile of the currently authenticated user.'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.responses[200] = {
      description: 'Current user returned successfully'
    }

    #swagger.responses[401] = {
      description: 'Unauthorized'
    }
  */

  authenticate,
  asyncHandler(authController.getCurrentUser),
);

// Logout route
router.post(
  "/logout",
  /*
    #swagger.tags = ['Google Auth (Frontend users only)']
    #swagger.summary = 'Logout user. '
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
  authenticate,
  asyncHandler(authController.logout),
);

module.exports = router;
