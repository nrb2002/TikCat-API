const crypto = require("crypto");
const Ticket = require("../models/Ticket");

const generateTicketCode = () => {
  return crypto.randomBytes(8).toString("hex");
};

const getAllTickets = async () => {
  return Ticket.find()
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");
};

const getTicketById = async (id) => {
  return Ticket.findById(id)
    .populate("eventId")
    .populate("attendeeId", "firstName lastName email");
};

const createTicket = async (eventId, attendeeId) => {
  return Ticket.create({
    eventId,
    attendeeId,
    ticketCode: generateTicketCode(),
  });
};

const validateTicket = async (ticketId) => {
  return Ticket.findByIdAndUpdate(ticketId, { status: "used" }, { new: true });
};

const cancelTicket = async (ticketId) => {
  return Ticket.findByIdAndUpdate(
    ticketId,
    { status: "cancelled" },
    { new: true },
  );
};

const deleteTicket = async (id) => {
  return Ticket.findByIdAndDelete(id);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  validateTicket,
  cancelTicket,
  deleteTicket,
};
