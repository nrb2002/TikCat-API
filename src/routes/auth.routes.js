const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

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
  */

  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  asyncHandler(authController.googleCallback),
);

/********************************************
 * LOCAL AUTH ROUTES
 ********************************************/

router.post(
  "/register",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register user'
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

  asyncHandler(authController.register),
);

router.post(
  "/login",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login user'
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

  asyncHandler(authController.login),
);

/********************************************
 * PROFILE ROUTES
 ********************************************/

router.get(
  "/profile",

  /*
    #swagger.tags = ['User Profile']
    #swagger.summary = 'Get current user profile'
    #swagger.description = 'Returns the currently authenticated user.'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.responses[200] = {
      description: 'User profile retrieved successfully',
      schema: {
        success: true,
        user: {
          id: '6845a123abc456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'attendee',
          profileImage: 'https://example.com/avatar.jpg'
        }
      }
    }

    #swagger.responses[401] = {
      description: 'Unauthorized'
    }
  */

  authenticate,
  asyncHandler(authController.getUserProfile),
);

/**************************************************
 * UPDATE USER PROFILE
 *************************************************/
router.put(
  "/profile",

  /*
    #swagger.tags = ['User Profile']
    #swagger.summary = 'Update profile'
    #swagger.description = 'Updates profile information of the authenticated user.'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Profile information',
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: 'https://example.com/avatar.jpg',
        "email": "johndoe@example.com",
        "phoneNumber": 0850000000,
        "role": "attendee",
      }
    }

    #swagger.responses[200] = {
      description: 'Profile updated successfully',
      schema: {
        success: true,
        message: 'Profile updated successfully'
      }
    }

    #swagger.responses[400] = {
      description: 'Validation failed'
    }

    #swagger.responses[401] = {
      description: 'Unauthorized'
    }
  */

  authenticate,
  asyncHandler(authController.updateProfile),
);

/**************************************************
 * CHANGE PASSWORD
 *************************************************/
router.put(
  "/change-password",

  /*
    #swagger.tags = ['User Profile']
    #swagger.summary = 'Change user password'
    #swagger.description = 'Allows authenticated user to change password.'

    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Password change payload',
      schema: {
        currentPassword: "OldPassword123",
        newPassword: "NewPassword123",
        confirmPassword: "NewPassword123"
      }
    }

    #swagger.responses[200] = {
      description: 'Password updated successfully',
      schema: {
        success: true,
        message: "Password updated successfully"
      }
    }

    #swagger.responses[400] = {
      description: 'Validation error (password mismatch or weak password)'
    }

    #swagger.responses[401] = {
      description: 'Current password is incorrect'
    }
  }
  */

  authenticate,
  asyncHandler(authController.changePassword),
);

/********************************************
 * LOGOUT
 ********************************************/

router.post(
  "/logout",

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Logout user'
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
  asyncHandler(authController.logout),
);

module.exports = router;
