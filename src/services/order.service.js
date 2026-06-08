const crypto = require("crypto");

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");

const getAllOrders = async () => {
  return Order.find()
    .populate("userId", "firstName lastName email")
    .populate("eventId")
    .populate("tickets");
};

const getOrderById = async (id) => {
  return Order.findById(id)
    .populate("userId", "firstName lastName email")
    .populate("eventId")
    .populate("tickets");
};

const createOrder = async (userId, eventId, quantity) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.availableTickets < quantity) {
    throw new Error("Insufficient tickets");
  }

  const tickets = [];

  for (let i = 0; i < quantity; i++) {
    const ticket = await Ticket.create({
      eventId,
      attendeeId: userId,
      ticketCode: crypto.randomBytes(8).toString("hex"),
      status: "paid",
    });

    tickets.push(ticket._id);
  }

  event.availableTickets -= quantity;
  await event.save();

  const totalAmount = quantity * event.ticketPrice;

  return Order.create({
    userId,
    eventId,
    tickets,
    quantity,
    totalAmount,
    paymentStatus: "paid",
  });
};

const updateOrder = async (id, data) => {
  return Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteOrder = async (id) => {
  return Order.findByIdAndDelete(id);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
