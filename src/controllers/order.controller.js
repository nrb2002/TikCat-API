const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json(orders);
};

const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.status(200).json(order);
};

const createOrder = async (req, res) => {
  const order = await orderService.createOrder(
    req.user.userId,
    req.body.eventId,
    req.body.quantity,
  );

  res.status(201).json(order);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
