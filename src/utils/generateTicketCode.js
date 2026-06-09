const crypto = require("crypto");

const generateTicketCode = () => {
  const date = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `TKT-${date}-${random}`;
};

module.exports = generateTicketCode;