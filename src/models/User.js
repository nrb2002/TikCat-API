const mongoose = require("mongoose");
const { ROLES } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    googleId: {
      type: String,
      required: [true, "Google ID is required"],
      unique: true,
    },

    role: {
      type: String,
      enum: {
        values: ROLES,
        message: "Invalid user role",
      },
      default: "attendee",
      index: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    phoneNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      firstName: ret.firstName,
      lastName: ret.lastName,
      email: ret.email,
      googleId: ret.googleId,
      role: ret.role,
      profileImage: ret.profileImage,
      phoneNumber: ret.phoneNumber,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

module.exports = mongoose.model("User", userSchema);