const Category = require("../models/Category");
const AppError = require("../utils/AppError");

const getAllCategories = async () => {
  return Category.find().sort({ name: 1 });
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

const createCategory = async (data) => {
  if (!data?.name) {
    throw new AppError("Category name is required", 400);
  }

  // normalize name (important for consistency)
  data.name = data.name.trim();

  return Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};