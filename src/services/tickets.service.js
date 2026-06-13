const Ticket = require("../models/Ticket");
const AppError = require("../utils/appError");

/**
 * GET ALL TICKETS
 */
const getAllTickets = async () => {
  return Ticket.find()
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");
};

/**
 * GET TICKET BY ID
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
 * VALIDATE TICKET (CHECK-IN SYSTEM)
 */
const validateTicket = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.status === "used") {
    throw new AppError("Ticket already used", 400);
  }

  if (ticket.status === "cancelled") {
    throw new AppError("Ticket is cancelled", 400);
  }

  ticket.status = "used";
  return await ticket.save();
};

/**
 * CANCEL TICKET
 */
const cancelTicket = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.status === "used") {
    throw new AppError("Cannot cancel a used ticket", 400);
  }

  ticket.status = "cancelled";
  return await ticket.save();
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
  validateTicket,
  cancelTicket,
  deleteTicket,
};
