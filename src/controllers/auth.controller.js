// controllers/auth.controller.js

const authService = require("../services/auth.service");

/**
 * Register user
 */
const register = async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json(result);
};

/**
 * Login user
 */
const login = async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);

  res.status(200).json(result);
};

/**
 * Google OAuth callback
 */
const googleCallback = async (req, res) => {
  const result = await authService.loginUser(req.user);

  res.status(200).json(result);
};

/**
 * Current authenticated user
 */
const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
      profileImage: req.user.profileImage,
    },
  });
};

/**
 * Logout
 */
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

module.exports = {
  register,
  login,
  googleCallback,
  getCurrentUser,
  logout,
};
