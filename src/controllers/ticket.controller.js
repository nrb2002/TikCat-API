const ticketService = require("../services/ticket.service");

const getAllTickets = async (req, res) => {
  const tickets = await ticketService.getAllTickets();

  res.status(200).json(tickets);
};

const getTicketById = async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  res.status(200).json(ticket);
};

const validateTicket = async (req, res) => {
  const ticket = await ticketService.validateTicket(req.params.id);

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  res.status(200).json(ticket);
};

module.exports = {
  getAllTickets,
  getTicketById,
  validateTicket,
};
