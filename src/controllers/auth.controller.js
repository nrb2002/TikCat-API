const authService = require("../services/auth.service");

/**
 * =========================
 * REGISTER
 * =========================
 */
const register = async (req, res) => {
  const user = await authService.register(req.body);

  const response = authService.buildAuthResponse(user);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    ...response,
  });
};

/**
 * =========================
 * LOGIN
 * =========================
 */
const login = async (req, res) => {
  const user = await authService.login(req.body.email, req.body.password);

  const response = authService.buildAuthResponse(user);

  res.status(200).json({
    success: true,
    message: "Login successful",
    ...response,
  });
};

/**
 * =========================
 * GOOGLE CALLBACK
 * =========================
 */
const googleCallback = async (req, res) => {
  const user = await authService.findOrCreateGoogleUser(req.user);

  const response = authService.buildAuthResponse(user);

  res.status(200).json({
    success: true,
    message: "Google authentication successful",
    ...response,
  });
};

/**
 * =========================
 * LOGOUT
 * =========================
 */
const logout = async (req, res) => {
  const result = await authService.logout();

  res.status(200).json({
    success: true,
    ...result,
  });
};

module.exports = {
  register,
  login,
  googleCallback,
  logout,
};
