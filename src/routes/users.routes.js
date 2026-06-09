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
  authenticate,
  authorize("admin"),
  asyncHandler(controller.getAllUsers),
);

// Get single user (self or admin logic handled in controller/service)
router.get(
  "/:id",
  authenticate,
  validateObjectId,
  asyncHandler(controller.getUserById),
);

// Update user (IMPORTANT: should be restricted properly)
router.put(
  "/:id",
  authenticate,
  validateObjectId,
  asyncHandler(controller.updateUser),
);

// Delete user (Admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteUser),
);

module.exports = router;
