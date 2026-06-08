const validateTicket = (req, res, next) => {
  const { eventId, price, quantity, type } = req.body;

  if (!eventId || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: "eventId, price, and quantity are required",
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      success: false,
      message: "price must be greater than 0",
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "quantity must be greater than 0",
    });
  }

  next();
};

module.exports = validateTicket;
