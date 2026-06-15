const express = require("express");

const controller = require("../controllers/categories.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

//Pull all categories
router.get(
  "/",
  /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.responses[200] = {
      description: 'List of categories',
      schema: [{ $ref: '#/definitions/Category' }]
    }
  */
  asyncHandler(controller.getAllCategories),
);

//Get a single ecategory
router.get(
  "/:id",
  /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get category by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Category ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Category' }
    }
    #swagger.responses[404] = {
      description: 'Category not found'
    }
  */
  validateObjectId("id"),
  asyncHandler(controller.getCategoryById),
);

//Create new category
router.post(
  "/",
  /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Create a category'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Category information',
      required: true,
      schema: {
        name: 'Technology',
        description: 'Technology related events'
      }
    }
    #swagger.responses[201] = {
      description: 'Category created successfully'
    }
  */
  authenticate,
  authorize("admin"),
  asyncHandler(controller.createCategory),
);

//Update an existing category
router.put(
  "/:id",

  /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Update category'
    #swagger.description = 'Updates an existing category.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Category ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated category information',
      required: true,
      schema: {
        name: 'Business',
        description: 'Business and entrepreneurship events'
      }
    }
    #swagger.responses[200] = {
      description: 'Category updated successfully'
    }
  */

  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.updateCategory),
);

//Delete a cateogry
router.delete(
  "/:id",
  /**
    #swagger.tags = ['Categories']
    #swagger.summary = 'Delete category (Admins only)'
    #swagger.description = 'Deletes an existing category.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Category ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Category deleted successfully!'
    }
  */
  authenticate,
  authorize("admin"),
  validateObjectId("id"),
  asyncHandler(controller.deleteCategory),
);

module.exports = router;
