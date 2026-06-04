const Order = require('../models/order.model');

const getAllOrders = async () => {
  return await Order.find()
    .populate('userId')
    .populate('ticketId');
};

const getOrderById = async (id) => {
  return await Order.findById(id)
    .populate('userId')
    .populate('ticketId');
};

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(
    id,
    orderData,
    { new: true, runValidators: true }
  );
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};