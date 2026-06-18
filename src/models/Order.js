const mongoose = require("mongoose");
const { PAYMENT_STATUS } = require("../utils/constants");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
      index: true,
    },

    tickets: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ticket",
        },
      ],
      default: [],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },

    paymentStatus: {
      type: String,
      enum: {
        values: PAYMENT_STATUS, // ["pending", "paid", "failed", "refunded"]
        message: "Invalid payment status",
      },
      default: "paid",
      index: true,
    },

    orderStatus: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Prevent duplicate fast-order lookup patterns
 */
orderSchema.index({ userId: 1, eventId: 1 });

module.exports = mongoose.model("Order", orderSchema);
