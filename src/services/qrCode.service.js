const QRCode = require("qrcode");
const AppError = require("../utils/appError");

/**
 * Generates QR code (base64 PNG)
 * Encodes only secure minimal ticket reference
 */
const generateQRCode = async (payload) => {
  try {
    const safePayload = {
      ticketId: payload.ticketId,
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(safePayload), {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 2,
      width: 300,
    });

    return qrCode;
  } catch (error) {
    throw new AppError("Failed to generate QR code", 500);
  }
};

module.exports = {
  generateQRCode,
};
