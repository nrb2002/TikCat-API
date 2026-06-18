const mongoose = require("mongoose");

const validateScanRequest = (req, res, next) => {
  const { ticketId } = req.body;

  if (!ticketId) {
    return res.status(400).json({
      success: false,
      message: "ticketId is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ticketId",
    });
  }

  next();
};

module.exports = {
  validateScanRequest,
};
