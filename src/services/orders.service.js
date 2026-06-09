const mongoose = require("mongoose");
const crypto = require("crypto");

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");

const generateTicketCode = require("../utils/generateTicketCode");
const qrCodeService = require("./qrCode.service");
const AppError = require("../utils/AppError");

/**
 * GET ALL ORDERS
 */
const getAllOrders = async () => {
  return Order.find()
    .populate("userId", "firstName lastName email")
    .populate("eventId")
    .populate("tickets");
};

/**
 * GET ORDER BY ID
 */
const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("userId", "firstName lastName email")
    .populate("eventId")
    .populate("tickets");

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

/**
 * CREATE ORDER (CORE BUSINESS LOGIC)
 */
const createOrder = async (userId, eventId, quantity) => {
  if (!quantity || quantity <= 0) {
    throw new AppError("Quantity must be greater than 0", 400);
  }

  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      // 1. Find event
      const event = await Event.findById(eventId).session(session);

      if (!event) {
        throw new AppError("Event not found", 404);
      }

      // 2. Check availability
      if (event.availableTickets < quantity) {
        throw new AppError("Insufficient tickets available", 400);
      }

      // 3. Reserve tickets (prevent overselling)
      event.availableTickets -= quantity;
      await event.save({ session });

      const tickets = [];

      // 4. Create tickets
      for (let i = 0; i < quantity; i++) {
        const ticketCode = generateTicketCode();

        const ticket = await Ticket.create(
          [
            {
              eventId,
              attendeeId: userId,
              ticketCode,
              status: "paid",
            },
          ],
          { session },
        );

        const createdTicket = ticket[0];

        // 5. Generate QR code
        const qrPayload = {
          ticketId: createdTicket._id,
          ticketCode: createdTicket.ticketCode,
          eventId,
        };

        createdTicket.qrCode = await qrCodeService.generateQRCode(qrPayload);
        await createdTicket.save({ session });

        tickets.push(createdTicket._id);
      }

      // 6. Calculate total
      const totalAmount = quantity * event.ticketPrice;

      // 7. Create order
      const order = await Order.create(
        [
          {
            userId,
            eventId,
            tickets,
            quantity,
            totalAmount,
            paymentStatus: "paid",
          },
        ],
        { session },
      );

      createdOrder = order[0];
    });

    return createdOrder;
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * UPDATE ORDER
 */
const updateOrder = async (id, data) => {
  const order = await Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

/**
 * DELETE ORDER
 */
const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
