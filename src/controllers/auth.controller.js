const authService = require("../services/auth.service");
const generateToken = require("../utils/generateToken");

const googleCallback = async (req, res) => {
  const token = generateToken(req.user);

  res.status(200).json({
    success: true,
    message: "Authentication successful",
    data: {
      token,
      user: req.user,
    },
  });
};

const logout = async (req, res) => {
  req.logout(() => {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

module.exports = {
  googleCallback,
  logout,
};
