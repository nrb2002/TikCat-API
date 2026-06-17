const service = require("../services/tickets.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

/**
 * GET ALL TICKETS
 */
const getAllTickets = async (req, res) => {
  const tickets = await service.getAllTickets();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: tickets.length
        ? "Tickets retrieved successfully!"
        : "No tickets found!",
      data: tickets,
    }),
  );
};

/**
 * GET TICKET BY ID
 */
const getTicketById = async (req, res) => {
  const { id } = req.params;

  const ticket = await service.getTicketById(id);

  if (!ticket) {
    throw new AppError("Ticket not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Ticket retrieved successfully!", ticket));
};

/**
 * VALIDATE TICKET
 */
const validateTicket = async (req, res) => {
  const { id } = req.params;

  const ticket = await service.validateTicket(id);

  if (!ticket) {
    throw new AppError("Ticket not found!", 404);
  }

  return res
    .status(200)
    .json(successResponse("Ticket validated successfully!", ticket));
};

module.exports = {
  getAllTickets,
  getTicketById,
  validateTicket,
};
