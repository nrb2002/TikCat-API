const User = require("../models/User");
const Event = require("../models/Event");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");

const getDashboardStats = async () => {
  try {
    const [totalUsers, totalEvents, totalOrders] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Order.countDocuments(),
    ]);

    const revenueResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const revenue = revenueResult[0]?.revenue || 0;

    return {
      totalUsers,
      totalEvents,
      totalOrders,
      revenue,
    };
  } catch (error) {
    throw new AppError("Failed to load dashboard stats", 500);
  }
};

module.exports = {
  getDashboardStats,
};
