const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    googleId: {
      type: String,
      required: true,
      unique: true
    },

    role: {
      type: String,
      enum: ["Admin", "Organizer", "Attendee"],
      default: "Attendee"
    },

    profileImage: {
      type: String
    },

    phoneNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => ({
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
  }),
});

module.exports = mongoose.model("User", userSchema);
