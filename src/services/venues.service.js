const Venue = require("../models/Venue");
const AppError = require("../utils/appError");

/**
 * GET ALL VENUES
 */
const getAllVenues = async () => {
  return Venue.find()
    .populate("ownerId", "firstName lastName email")
    .sort({ createdAt: -1 });
};

/**
 * GET VENUE BY ID
 */
const getVenueById = async (id) => {
  const venue = await Venue.findById(id).populate(
    "ownerId",
    "firstName lastName email",
  );

  if (!venue) {
    throw new AppError("Venue not found", 404);
  }

  return venue;
};

/**
 * CREATE VENUE
 */
const createVenue = async (data) => {
  if (data.capacity && data.capacity <= 0) {
    throw new AppError("Venue capacity must be greater than 0", 400);
  }

  return Venue.create(data);
};

/**
 * UPDATE VENUE
 * Protect ownership field
 */
const updateVenue = async (id, data) => {
  // Prevent ownership hijacking
  delete data.ownerId;

  if (data.capacity && data.capacity <= 0) {
    throw new AppError("Venue capacity must be greater than 0", 400);
  }

  const venue = await Venue.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!venue) {
    throw new AppError("Venue not found", 404);
  }

  return venue;
};

/**
 * DELETE VENUE
 */
const deleteVenue = async (id) => {
  const venue = await Venue.findByIdAndDelete(id);

  if (!venue) {
    throw new AppError("Venue not found", 404);
  }

  return venue;
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};
