const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      index: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      index: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
      index: true,
    },

    contactPhone: {
      type: String,
      default: null,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

venueSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      name: ret.name,
      address: ret.address,
      city: ret.city,
      capacity: ret.capacity,
      contactPhone: ret.contactPhone,
      imageUrl: ret.imageUrl,
      ownerId: ret.ownerId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

      

module.exports = mongoose.model("Venue", venueSchema);
