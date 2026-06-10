const express = require("express");

const controller = require("../controllers/users.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Get all users (Admin only)
router.get(
  "/",

  /**
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users (Admins only)'
    #swagger.security = [{
      "BearerAuth": []
    }]
   * 
   */
  authenticate,
  authorize("admin"),
  asyncHandler(controller.getAllUsers),
);

// Get single user (self or admin logic handled in controller and service)
router.get(
  "/:id",

  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get user by ID (Must be authenticated)'
    #swagger.security = [{
      "BearerAuth": []
    }]
  
  */
  authenticate,
  validateObjectId,
  asyncHandler(controller.getUserById),
);

// Update user (IMPORTANT: should be restricted properly)
router.put(
  "/:id",

  /**
    #swagger.tags = ['Users']
    #swagger.summary = 'Update user (Must be authenticated)'
    #swagger.security = [{
      "BearerAuth": []
    }]
   */
  authenticate,
  validateObjectId,
  asyncHandler(controller.updateUser),
);

// Delete user (Admin only)
router.delete(
  "/:id",
  /**
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete user'
    #swagger.security = [{
      "BearerAuth": []
    }]
  */
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteUser),
);

module.exports = router;
