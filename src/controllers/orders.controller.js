const service = require("../services/orders.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

/**
 * GET ALL ORDERS
 */
const getAllOrders = async (req, res) => {
  const orders = await service.getAllOrders();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: orders.length
        ? "Orders retrieved successfully!"
        : "No orders found!",
      data: orders,
    }),
  );
};

/**
 * GET ORDER BY ID
 */
const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await service.getOrderById(id);

  if (!order) {
    throw new AppError("Order not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Order retrieved successfully!", order));
};

/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
  const { eventId, quantity } = req.body;

  const order = await service.createOrder(req.user.userId, eventId, quantity);

  return res
    .status(201)
    .json(successResponse("Order created successfully!", order));
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
