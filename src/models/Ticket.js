const mongoose = require("mongoose");
const { TICKET_STATUS } = require("../utils/constants");

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
      index: true,
    },

    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Attendee is required"],
      index: true,
    },

    ticketCode: {
      type: String,
      required: [true, "Ticket code is required"],
      unique: true,
      trim: true,
      index: true,
      match: [/^[A-Z0-9\-]+$/, "Invalid ticket code format"],
    },

    qrCode: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: {
        values: TICKET_STATUS, // ["reserved", "paid", "used", "cancelled"]
        message: "Invalid ticket status",
      },
      default: "reserved",
      index: true,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Prevent duplicate tickets for same user + event (optional but recommended)
 */
ticketSchema.index({ eventId: 1, attendeeId: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);
