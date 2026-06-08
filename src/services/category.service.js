const Category = require("../models/Category");

const getAllCategories = async () => {
  return Category.find().sort({ name: 1 });
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const createCategory = async (data) => {
  return Category.create(data);
};

const updateCategory = async (id, data) => {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteCategory = async (id) => {
  return Category.findByIdAndDelete(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
