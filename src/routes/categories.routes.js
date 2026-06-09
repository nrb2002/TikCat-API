const express = require("express");

const controller = require("../controllers/categories.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/",
  asyncHandler(controller.getAllCategories)
);

router.get(
  "/:id",
  validateObjectId,
  asyncHandler(controller.getCategoryById)
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  asyncHandler(controller.createCategory)
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.updateCategory)
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteCategory)
);

module.exports = router;