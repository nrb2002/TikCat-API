const service = require("../services/categories.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

const getAllCategories = async (req, res) => {
  const categories = await service.getAllCategories();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: categories.length
        ? "Categories retrieved successfully!"
        : "No categories found!",
      data: categories,
    }),
  );
};

const getCategoryById = async (req, res) => {
  const category = await service.getCategoryById(req.params.id);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Category retrieved successfully!", category));
};

const createCategory = async (req, res) => {
  const category = await service.createCategory(req.body);

  return res
    .status(201)
    .json(successResponse("Category created successfully!", category));
};

const updateCategory = async (req, res) => {
  const category = await service.updateCategory(req.params.id, req.body);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Category updated successfully!", category));
};

const deleteCategory = async (req, res) => {
  const category = await service.deleteCategory(req.params.id);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Category deleted successfully!"));
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
