const User = require("../models/User");
const Event = require("../models/Event");
const Order = require("../models/Order");

const getDashboardStats = async () => {
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
        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return {
    totalUsers,
    totalEvents,
    totalOrders,
    revenue: revenueResult[0]?.revenue || 0,
  };
};

module.exports = {
  getDashboardStats,
};
