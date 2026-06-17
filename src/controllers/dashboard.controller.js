const service = require("../services/dashboard.service");
const { successResponse } = require("../utils/apiResponse");

const getDashboardStats = async (req, res) => {
  const stats = await service.getDashboardStats();

  return res
    .status(200)
    .json(successResponse("Dashboard stats retrieved successfully!", stats));
};

module.exports = {
  getDashboardStats,
};
