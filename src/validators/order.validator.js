const mongoose = require("mongoose");

const validateOrderRequest = (req, res, next) => {
  const { eventId, quantity } = req.body;

  if (!eventId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "eventId and quantity are required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid eventId",
    });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "quantity must be a positive integer",
    });
  }

  next();
};

module.exports = validateOrderRequest;
