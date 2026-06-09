const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name must be less than 50 characters"],
    },

    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters"],
      maxlength: [255, "Description must be less than 255 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);