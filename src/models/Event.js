const mongoose = require("mongoose");
const { EVENT_STATUS } = require("../utils/constants");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be less than 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be less than 1000 characters"],
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },

    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "Venue is required"],
      index: true,
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer is required"],
      index: true,
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
    },

    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: [0, "Ticket price cannot be negative"],
    },

    totalTickets: {
      type: Number,
      required: [true, "Total tickets is required"],
      min: [1, "Total tickets must be at least 1"],
    },

    availableTickets: {
      type: Number,
      required: true,
      min: [0, "Available tickets cannot be negative"],
    },

    imageUrl: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: EVENT_STATUS,
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overbooking logic
eventSchema.pre("save", function (next) {
  if (this.availableTickets > this.totalTickets) {
    return next(
      new Error(
        "Available tickets cannot exceed total tickets"
      )
    );
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);