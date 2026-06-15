const bcrypt = require("bcrypt");

const User = require("../models/User");
const AppError = require("../utils/appError");

/**
 * =========================
 * USER PROFILE (GET)
 * =========================
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.toJSON();
};

/**
 * =========================
 * UPDATE OWN PROFILE
 * =========================
 *
 * User can update:
 * firstName
 * lastName
 * profileImage
 * phoneNumber
 * bio
 *
 * Cannot update:
 * email
 * role
 * password
 * googleId
 */
const updateProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.firstName = data.firstName ?? user.firstName;
  user.lastName = data.lastName ?? user.lastName;
  user.profileImage = data.profileImage ?? user.profileImage;
  user.phoneNumber = data.phoneNumber ?? user.phoneNumber;
  user.bio = data.bio ?? user.bio;

  await user.save();

  return user.toJSON();
};

/**
 * =========================
 * CHANGE PASSWORD
 * =========================
 */
const changePassword = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword,
) => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new AppError("All fields are required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  if (newPassword !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.password) {
    throw new AppError("Google accounts cannot change password", 400);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return {
    success: true,
    message: "Password updated successfully",
  };
};

/**
 * =========================
 * ADMIN:
 * GET ALL USERS
 * =========================
 */
const getAllUsers = async () => {
  const users = await User.find().select("-password -googleId -__v");

  return {
    success: true,
    count: users.length,
    users,
  };
};

/**
 * =========================
 * ADMIN:
 * GET SINGLE USER
 * =========================
 */
const getSingleUser = async (id) => {
  const user = await User.findById(id).select("-password -googleId -__v");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    success: true,

    user,
  };
};

/**
 * =========================
 * ADMIN:
 * UPDATE USER
 * =========================
 *
 * Admin can update:
 * name
 * role
 * active status
 * verification
 * contact info
 */
const updateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "role",
    "isActive",
    "isVerified",
    "profileImage",
    "phoneNumber",
    "bio",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      user[field] = data[field];
    }
  });

  await user.save();

  return {
    success: true,
    message: "User updated successfully",
    user: user.toJSON(),
  };
};

/**
 * =========================
 * ADMIN:
 * DELETE USER
 * =========================
 */
const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role === "admin") {
    throw new AppError("Admin accounts cannot be deleted", 403);
  }

  await User.findByIdAndDelete(id);

  return {
    success: true,
    message: "User deleted successfully",
  };
};

module.exports = {
  // User profile

  getProfile,
  updateProfile,
  changePassword,

  // Admin management

  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
