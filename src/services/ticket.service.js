const Ticket = require("../models/ticket.model");

const getAllTickets = async () => {
  return await Ticket.find();
};

const getTicketById = async (id) => {
  return await Ticket.findById(id);
};

const createTicket = async (ticketData) => {
  return await Ticket.create(ticketData);
};

const updateTicket = async (id, ticketData) => {
  return await Ticket.findByIdAndUpdate(id, ticketData, {
    new: true,
    runValidators: true,
  });
};

const deleteTicket = async (id) => {
  return await Ticket.findByIdAndDelete(id);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
