const express = require("express");

const controller = require("../controllers/categories.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

/**
 * GET ALL CATEGORIES (PUBLIC)
 */
router.get(
  "/",
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
  */
  asyncHandler(controller.getAllCategories)
);

/**
 * GET CATEGORY BY ID (PUBLIC)
 */
router.get(
  "/:id",
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get category by ID'
  */
  validateObjectId("id"),
  asyncHandler(controller.getCategoryById)
);

/**
 * CREATE CATEGORY (ADMIN ONLY)
 */
router.post(
  "/",
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Create a category'
    #swagger.security = [{ "BearerAuth": [] }]
  */
  authenticate,
  authorize("admin"),
  asyncHandler(controller.createCategory)
);

/**
 * UPDATE CATEGORY (ADMIN ONLY)
 */
router.put(
  "/:id",
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Update category'
  */
  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.updateCategory)
);

/**
 * DELETE CATEGORY (ADMIN ONLY)
 */
router.delete(
  "/:id",
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Delete category'
  */
  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.deleteCategory)
);

module.exports = router;