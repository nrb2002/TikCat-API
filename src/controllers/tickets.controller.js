const ticketService = require("../services/tickets.service");
const { successResponse } = require("../utils/apiResponse");


/**
 * ADMIN: GET ALL TICKETS
 */
const getAllTickets = async (req, res) => {
  const { page, limit } = req.query;

  const tickets = await ticketService.getAllTickets(
    Number(page || 1),
    Number(limit || 20)
  );

  return res
    .status(200)
    .json(successResponse("Tickets retrieved successfully", tickets));
};


/**
 * ADMIN: GET TICKET BY ID
 */
const getTicketById = async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);

  return res
    .status(200)
    .json(successResponse("Ticket retrieved successfully", ticket));
};


/**
 * USER: GET MY TICKETS
 */
const getMyTickets = async (req, res) => {
  const tickets = await ticketService.getUserTickets(req.user.id);

  return res
    .status(200)
    .json(successResponse("Your tickets retrieved successfully", tickets));
};


/**
 * USER: GET MY TICKET BY ID
 */
const getMyTicketById = async (req, res) => {
  const ticket = await ticketService.getUserTicketById(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(successResponse("Ticket retrieved successfully", ticket));
};


/**
 * USER: GET QR CODE
 */
const getTicketQRCode = async (req, res) => {
  const qrCode = await ticketService.getTicketQRCode(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(successResponse("QR code retrieved successfully", qrCode));
};


/**
 * ADMIN / ORGANIZER: SCAN TICKET
 */
const validateTicket = async (req, res) => {
  const ticket = await ticketService.scanTicket(req.params.id);

  return res
    .status(200)
    .json(successResponse("Ticket validated successfully", ticket));
};


/**
 * USER: CANCEL TICKET
 */
const cancelTicket = async (req, res) => {
  const ticket = await ticketService.cancelTicket(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(successResponse("Ticket cancelled successfully", ticket));
};


/**
 * ADMIN: DELETE TICKET
 */
const deleteTicket = async (req, res) => {
  const ticket = await ticketService.deleteTicket(req.params.id);

  return res
    .status(200)
    .json(successResponse("Ticket deleted successfully", ticket));
};


module.exports = {
  getAllTickets,
  getTicketById,
  getMyTickets,
  getMyTicketById,
  getTicketQRCode,
  validateTicket,
  cancelTicket,
  deleteTicket,
};