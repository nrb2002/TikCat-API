const orderService = require("../services/orders.service");
const AppError = require("../utils/AppError");

const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await orderService.getOrderById(id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json(order);
};

const createOrder = async (req, res) => {
  const { eventId, quantity } = req.body;

  const order = await orderService.createOrder(
    req.user.userId,
    eventId,
    quantity,
  );

  res.status(201).json(order);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
