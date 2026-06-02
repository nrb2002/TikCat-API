const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    founders: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    foundedYear: {
      type: Number,
      required: true,
    },

    location: {
      ward: {
        type: String,
        trim: true,
      },
      stake: {
        type: String,
        trim: true,
      },
      commune: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      province: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },

    phone: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    website: {
      type: String,
    },

    email: {
      type: String,
    },

    products: [
      {
        type: String,
      },
    ],

    employees: {
      type: Number,
    },

    startupStage: {
      type: String,
      enum: ["Idea", "MVP", "Revenue", "Growth", "Scale"],
    },

    fundingStage: {
      type: String,
      enum: [
        "Bootstrapped",
        "Pre-Seed",
        "Seed",
        "Series A",
        "Series B",
        "Series C+",
      ],
    },

    turnover: [
      {
        year: Number,
        amount: Number,
      },
    ],

    socialMedia: {
      linkedin: String,
      x: String,
      facebook: String,
      instagram: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Re-order fields when rendering json
startupSchema.set("toJSON", {
  transform: (doc, ret) => ({
    _id: ret._id,
    name: ret.name,
    description: ret.description,
    industry: ret.industry,

    founders: ret.founders,
    foundedYear: ret.foundedYear,

    location: ret.location,

    phone: ret.phone,
    email: ret.email,
    website: ret.website,

    products: ret.products,

    employees: ret.employees,

    startupStage: ret.startupStage,
    fundingStage: ret.fundingStage,
    turnover: ret.turnover,
    socialMedia: ret.socialMedia,
    isActive: ret.isActive,
    createdAt: ret.createdAt,
    updatedAt: ret.updatedAt,
    __v: ret.__v,
  }),
});

module.exports = mongoose.model("Startup", startupSchema);
