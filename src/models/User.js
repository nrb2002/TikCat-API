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

    password: {
      type: String,
      minlength: 6,
    },

    googleId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: {
        values: ROLES,
        message: "Invalid user role",
      },
      default: ROLES[2], // Default to "Attendee"
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
  },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      firstName: ret.firstName,
      lastName: ret.lastName,
      email: ret.email,
      phoneNumber: ret.phoneNumber,
      profileImage: ret.profileImage,
      role: ret.role,
      googleId: ret.googleId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

module.exports = mongoose.model("User", userSchema);
