const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
      trim: true,
    },

    role: {
      type: String,
      enum: ["Founder", "Investor", "Developer", "Admin"],
      default: "Founder",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    profilePicture: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    startups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => ({
    _id: ret._id,
    firstName: ret.firstName,
    lastName: ret.lastName,
    username: ret.username,
    email: ret.email,
    role: ret.role,
    phone: ret.phone,
    location: ret.location,
    profilePicture: ret.profilePicture,
    bio: ret.bio,
    isVerified: ret.isVerified,
    isActive: ret.isActive,
    startups: ret.startups,
    createdAt: ret.createdAt,
    updatedAt: ret.updatedAt,
  }),
});

module.exports = mongoose.model("User", userSchema);
