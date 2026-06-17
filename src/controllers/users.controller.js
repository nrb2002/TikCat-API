const service = require("../services/users.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

/**
 * =========================
 * GET PROFILE
 * =========================
 */
const getUserProfile = async (req, res) => {
  const user = await service.getProfile(req.user._id);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Profile retrieved successfully!", user));
};

/**
 * =========================
 * UPDATE PROFILE
 * =========================
 */
const updateProfile = async (req, res) => {
  const user = await service.updateProfile(req.user._id, req.body);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Profile updated successfully!", user));
};

/**
 * =========================
 * CHANGE PASSWORD
 * =========================
 */
const changePassword = async (req, res) => {
  const result = await service.changePassword(
    req.user._id,
    req.body.currentPassword,
    req.body.newPassword,
    req.body.confirmPassword,
  );

  return res
    .status(200)
    .json(successResponse("Password changed successfully!", result));
};

/*********************************
 * GET ALL USERS
 * ADMIN ONLY
 ********************************/
const getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: users.length
        ? "Users retrieved successfully!"
        : "No users found!",
      data: users,
    }),
  );
};

/*********************************
 * GET SINGLE USER
 * ADMIN ONLY
 ********************************/
const getUserById = async (req, res) => {
  const user = await service.getSingleUser(req.params.id);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("User retrieved successfully!", user));
};

/*********************************
 * UPDATE USER
 * ADMIN ONLY
 ********************************/
const updateUser = async (req, res) => {
  const user = await service.updateUser(req.params.id, req.body);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("User updated successfully!", user));
};

/*********************************
 * DELETE USER
 * ADMIN ONLY
 ********************************/
const deleteUser = async (req, res) => {
  const user = await service.deleteUser(req.params.id);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return res.status(200).json(successResponse("User deleted successfully!"));
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateProfile,
  changePassword,
};
