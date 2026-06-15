const express = require("express");

const controller = require("../controllers/users.controller");
const asyncHandler = require("../utils/asyncHandler");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");

const userValidator = require("../validators/user.validator");

const router = express.Router();

/*********************************
 * ADMIN USER MANAGEMENT
 *********************************/

/**
 * GET ALL USERS
 * ADMIN ONLY
 */
router.get(
  "/users",

  /*
    #swagger.tags = ['User Management']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns all users. Admin access required.'
    #swagger.security = [{
      "BearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Users retrieved successfully"
    }

    #swagger.responses[403] = {
      description: "Admin access required"
    }
  */

  authenticate,
  authorize("admin"),
  asyncHandler(controller.getAllUsers),
);

/**
 * GET SINGLE USER
 * ADMIN ONLY
 */
router.get(
  "/users/:id",

  /*
    #swagger.tags = ['User Management']
    #swagger.summary = 'Get user by ID'

    #swagger.parameters['id'] = {
      in:'path',
      required:true,
      type:'string',
      example:'65f8d8c1a2b3c4d5e6'
    }

    #swagger.security = [{
      "BearerAuth":[]
    }]
  */

  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.getUserById),
);

/**
 * UPDATE USER
 * ADMIN ONLY
 */
router.put(
  "/users/:id",

  /*
    #swagger.tags = ['User Management']

    #swagger.summary = 'Update user'

    #swagger.description =
    'Admin can update user profile information, role, verification and account status.'

    #swagger.security = [{
      "BearerAuth":[]
    }]

    #swagger.parameters['body'] = {
      in:'body',
      required:true,
      schema:{
        firstName:"John",
        lastName:"Doe",
        role:"organizer",
        isActive:true,
        isVerified:true,
        phoneNumber:"+123456789",
        profileImage:"https://example.com/photo.jpg",
        bio:"Event organizer"
      }
    }

  */

  authenticate,
  authorize("admin"),  
  userValidator.updateProfileValidationRules(),
  validate,
  validateObjectId("id"),
  asyncHandler(controller.updateUser),
);

/**
 * DELETE USER
 * ADMIN ONLY
 */
router.delete(
  "/users/:id",

  /*
    #swagger.tags = ['User Management']

    #swagger.summary = 'Delete user'

    #swagger.description =
    'Deletes a user. Admin accounts cannot be deleted.'

    #swagger.security = [{
      "BearerAuth":[]
    }]

  */

  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.deleteUser),
);

module.exports = router;
