const Ticket = require("../models/Ticket");
const AppError = require("../utils/appError");


/**
 * GET ALL TICKETS (ADMIN / ORGANIZER)
 */
const getAllTickets = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const tickets = await Ticket.find()
    .skip(skip)
    .limit(limit)
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");

  return tickets;
};


/**
 * GET TICKET BY ID (ADMIN USE)
 */
const getTicketById = async (id) => {
  const ticket = await Ticket.findById(id)
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  return ticket;
};


/**
 * GET USER TICKETS
 */
const getUserTickets = async (userId) => {
  const tickets = await Ticket.find({ attendeeId: userId })
    .populate("eventId")
    .sort({ createdAt: -1 });

  return tickets;
};


/**
 * GET USER TICKET BY ID (SECURE)
 */
const getUserTicketById = async (ticketId, userId) => {
  const ticket = await Ticket.findById(ticketId)
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.attendeeId.toString() !== userId) {
    throw new AppError("Unauthorized access to ticket", 403);
  }

  return ticket;
};


/**
 * GET QR CODE (SECURE)
 */
const getTicketQRCode = async (ticketId, userId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.attendeeId.toString() !== userId) {
    throw new AppError("Unauthorized access to ticket", 403);
  }

  if (ticket.status === "cancelled") {
    throw new AppError("Ticket is cancelled", 400);
  }

  return ticket.qrCode;
};


/**
 * SCAN / VALIDATE TICKET (CHECK-IN SYSTEM)
 */
const scanTicket = async (ticketId) => {
  if (!ticketId) {
    throw new AppError("Ticket ID is required", 400);
  }

  const ticket = await Ticket.findOneAndUpdate(
    {
      _id: ticketId,
      status: { $nin: ["used", "cancelled"] },
    },
    {
      status: "used",
      checkInDate: new Date(),
    },
    {
      new: true,
    },
  )
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");

  if (!ticket) {
    throw new AppError("Ticket invalid or already used", 400);
  }

  return ticket;
};


/**
 * CANCEL TICKET (USER)
 */
const cancelTicket = async (ticketId, userId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.attendeeId.toString() !== userId) {
    throw new AppError("Unauthorized access", 403);
  }

  if (ticket.status === "used") {
    throw new AppError("Cannot cancel used ticket", 400);
  }

  if (ticket.status === "cancelled") {
    throw new AppError("Ticket already cancelled", 400);
  }

  ticket.status = "cancelled";

  return ticket.save();
};


/**
 * DELETE TICKET (ADMIN ONLY)
 */
const deleteTicket = async (id) => {
  const ticket = await Ticket.findByIdAndDelete(id);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  return ticket;
};


module.exports = {
  getAllTickets,
  getTicketById,
  getUserTickets,
  getUserTicketById,
  getTicketQRCode,
  scanTicket,
  cancelTicket,
  deleteTicket,
};