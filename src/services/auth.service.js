const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/appError");
const { ROLES } = require("../utils/constants");

/**
 * =========================
 * GOOGLE OAUTH
 * =========================
 */
const findOrCreateGoogleUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails?.[0]?.value,
      googleId: profile.id,
      profileImage: profile.photos?.[0]?.value,
      role: "attendee",
    });
  }

  return user;
};

/**
 * =========================
 * REGISTER
 * =========================
 */
const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    profileImage: data.profileImage,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
    role: ROLES[2], // Default to Attendee
  });

  return user;
};

/**
 * =========================
 * LOGIN
 * =========================
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!user.password) {
    throw new AppError("Please login using Google", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

/**
 * =========================
 * PROFILE (GET)
 * =========================
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/**
 * =========================
 * UPDATE PROFILE
 * =========================
 */
const updateProfile = async (userId, data) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      profileImage: data.profileImage,
      phoneNumber: data.phoneNumber,
    },
    { new: true },
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
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
  //Check if any of the required field is empty
  if (!newPassword || !confirmPassword || !currentPassword) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.password) {
    throw new AppError("Google accounts cannot change password", 400);
  }

  // confirm password check
  if (newPassword !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect!", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return true;
};

/**
 * =========================
 * LOGOUT
 * =========================
 */
const logout = async () => {
  return {
    message: "Logout successful. Remove token from client storage.",
  };
};

/**
 * =========================
 * TOKEN RESPONSE BUILDER
 * =========================
 */
const buildAuthResponse = (user) => {
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      profileImage: user.profileImage,
    },
  };
};

module.exports = {
  register,
  login,
  findOrCreateGoogleUser,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  buildAuthResponse,
};
