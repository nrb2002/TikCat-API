const authService = require("../services/auth.service");

const googleCallback = async (req, res) => {
  const token = authService.generateToken(req.user);

  res.status(200).json({
    token,
    user: req.user,
  });
};

const logout = async (req, res) => {
  req.logout(() => {
    res.status(200).json({
      message: "Logged out successfully",
    });
  });
};

module.exports = {
  googleCallback,
  logout,
};
