const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ticketCode: {
      type: String,
      required: true,
      unique: true
    },

    qrCode: {
      type: String
    },

    status: {
      type: String,
      enum: ["reserved", "paid", "used", "cancelled"],
      default: "reserved"
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);