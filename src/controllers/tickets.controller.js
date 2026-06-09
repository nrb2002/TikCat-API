const ticketService = require("../services/tickets.service");
const AppError = require("../utils/AppError");

const getAllTickets = async (req, res) => {
  const tickets = await ticketService.getAllTickets();

  res.status(200).json(tickets);
};

const getTicketById = async (req, res) => {
  const { id } = req.params;

  const ticket = await ticketService.getTicketById(id);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  res.status(200).json(ticket);
};

const validateTicket = async (req, res) => {
  const { id } = req.params;

  const ticket = await ticketService.validateTicket(id);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  res.status(200).json(ticket);
};

module.exports = {
  getAllTickets,
  getTicketById,
  validateTicket,
};