const QRCode = require("qrcode");
const AppError = require("../utils/AppError");

/**
 * Generates a QR code image (base64 string)
 * from ticket data or payload
 */

const generateQRCode = async (payload) => {
  try {
    const qrCode = await QRCode.toDataURL(JSON.stringify(payload), {
      errorCorrectionLevel: "H",
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
