const dashboardService = require("../services/dashboard.service");

const getDashboardStats = async (req, res) => {
  const stats = await dashboardService.getDashboardStats();

  res.status(200).json(stats);
};

module.exports = {
  getDashboardStats,
};
