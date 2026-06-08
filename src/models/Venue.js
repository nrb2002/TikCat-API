const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    contactPhone: {
      type: String
    },

    imageUrl: {
      type: String
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Venue", venueSchema);