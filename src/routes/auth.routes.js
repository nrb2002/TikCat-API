const express = require("express");
const passport = require("passport");

const controller = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const userValidator = require("../validators/user.validator");

const router = express.Router();

/********************************************
 * GOOGLE SIGNUP / LOGIN ROUTES
 ********************************************/

router.get(
  "/google",

  /*
    #swagger.tags = ['Google OAuth']
    #swagger.summary = 'Login with Google'
    #swagger.description = 'Redirects the user to Google OAuth authentication.'
    #swagger.ignore = true
  */

  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",

  /*
    #swagger.tags = ['Google OAuth']
    #swagger.summary = 'Google OAuth callback'
    #swagger.description = 'Handles Google authentication and returns a JWT token.'

    #swagger.responses[200] = {
      description: 'Authentication successful',
      schema: {
        success: true,
        message: 'Login successful',
        token: 'jwt_token_here',
        user: {
          id: '6845a123abc456',
          email: 'john@gmail.com',
          name: 'John Doe',
          role: 'attendee'
        }
      }
    }

    #swagger.responses[401] = {
      description: 'Authentication failed'
    }

    #swagger.ignore = true
  */

  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  asyncHandler(controller.googleCallback),
);

/********************************************
 * LOCAL AUTH ROUTES
 ********************************************/
// Registration and login routes are public and do not require authentication
router.post(
  "/register",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register user (Public)'
    #swagger.description = 'Creates a new user account and returns a JWT token.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'User registration data',
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123'
      }
    }

    #swagger.responses[201] = {
      description: 'User registered successfully',
      schema: {
        success: true,
        message: 'Registration successful',
        token: 'jwt_token_here',
        user: {
          id: '6845a123abc456',
          email: 'john@example.com',
          name: 'John Doe',
          role: 'attendee'
        }
      }
    }

    #swagger.responses[409] = {
      description: 'Email already registered'
    }

    #swagger.responses[400] = {
      description: 'Validation failed'
    }
  */
  userValidator.registerValidationRules(),
  validate,
  asyncHandler(controller.register),
);

// Login route is public and does not require authentication
router.post(
  "/login",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login user (Public)'
    #swagger.description = 'Authenticates user and returns a JWT token.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'User credentials',
      schema: {
        email: 'john@example.com',
        password: 'Password123'
      }
    }

    #swagger.responses[200] = {
      description: 'Login successful',
      schema: {
        success: true,
        message: 'Login successful',
        token: 'jwt_token_here',
        user: {
          id: '6845a123abc456',
          email: 'john@example.com',
          name: 'John Doe',
          role: 'attendee'
        }
      }
    }

    #swagger.responses[401] = {
      description: 'Invalid credentials'
    }
  */
  userValidator.loginValidationRules(),
  validate,
  asyncHandler(controller.login),
);

/********************************************
 * LOGOUT
 ********************************************/

router.post(
  "/logout",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Logout user (Must be logged in)'
    #swagger.description = 'Logs out the authenticated user.'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.responses[200] = {
      description: 'Logout successful',
      schema: {
        success: true,
        message: 'Logged out successfully'
      }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized'
    }
  */

  authenticate,
  asyncHandler(controller.logout),
);

module.exports = router;
