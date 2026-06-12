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
    role: ROLES[2], // Default to attendee
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
  logout,
  buildAuthResponse,
};
