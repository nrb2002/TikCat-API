const Venue = require("../models/Venue");

const getAllVenues = async () => {
  return Venue.find()
    .populate("ownerId", "firstName lastName email")
    .sort({ createdAt: -1 });
};

const getVenueById = async (id) => {
  return Venue.findById(id).populate("ownerId", "firstName lastName email");
};

const createVenue = async (data) => {
  return Venue.create(data);
};

const updateVenue = async (id, data) => {
  return Venue.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteVenue = async (id) => {
  return Venue.findByIdAndDelete(id);
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};
