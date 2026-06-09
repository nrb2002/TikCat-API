const User = require("../models/User");
const AppError = require("../utils/AppError");

/**
 * GET ALL USERS
 */
const getAllUsers = async () => {
  return await User.find().select("-__v");
};

/**
 * GET SINGLE USER
 */
const getSingleUser = async (id) => {
  const user = await User.findById(id).select("-__v");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/**
 * CREATE USER
 * (Usually used only by OAuth system)
 */
const createUser = async (data) => {
  return await User.create(data);
};

/**
 * UPDATE USER
 * Prevent critical field modification
 */
const updateUser = async (id, data) => {
  // NEVER allow role/email/googleId changes here
  delete data.googleId;
  delete data.email;
  delete data.role;

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/**
 * DELETE USER
 */
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};