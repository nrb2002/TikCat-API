const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(categories);
};

const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
};

const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(204).send();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
