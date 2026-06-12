const validateOrder = (req, res, next) => {
  const { userId, ticketId, quantity, totalPrice } = req.body;

  if (!userId || !ticketId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "userId, ticketId, and quantity are required",
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "quantity must be greater than 0",
    });
  }

  if (totalPrice && totalPrice < 0) {
    return res.status(400).json({
      success: false,
      message: "totalPrice cannot be negative",
    });
  }

  next();
};

module.exports = validateOrder;
