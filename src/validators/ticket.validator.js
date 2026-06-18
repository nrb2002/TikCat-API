const Ticket = require("../models/Ticket");

const validateTicketForScan = async (req, res, next) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found!",
    });
  }

  if (ticket.status === "used") {
    return res.status(400).json({
      success: false,
      message: "Ticket already used!",
    });
  }

  if (ticket.status === "cancelled") {
    return res.status(400).json({
      success: false,
      message: "Ticket is cancelled!",
    });
  }

  req.ticket = ticket;
  next();
};

module.exports = {
  validateTicketForScan,
};
