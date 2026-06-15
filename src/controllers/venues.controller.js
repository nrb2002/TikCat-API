const service = require("../services/venues.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

const getAllVenues = async (req, res) => {
  const venues = await service.getAllVenues();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: venues.length
        ? "Venues retrieved successfully!"
        : "No venues found!",
      data: venues,
    })
  );
};

const getVenueById = async (req, res) => {
  const venue = await service.getVenueById(req.params.id);

  if (!venue) {
    throw new AppError("Venue not found!", 404);
  }

  return res.status(200).json(
    successResponse(
      "Venue retrieved successfully!",
      venue
    )
  );
};

const createVenue = async (req, res) => {
  const venue = await service.createVenue(req.body);

  return res.status(201).json(
    successResponse(
      "Venue created successfully!",
      venue
    )
  );
};

const updateVenue = async (req, res) => {
  const venue = await service.updateVenue(
    req.params.id,
    req.body
  );

  if (!venue) {
    throw new AppError("Venue not found!", 404);
  }

  return res.status(200).json(
    successResponse(
      "Venue updated successfully!",
      venue
    )
  );
};

const deleteVenue = async (req, res) => {
  const venue = await service.deleteVenue(req.params.id);

  if (!venue) {
    throw new AppError("Venue not found!", 404);
  }

  return res.status(200).json(
    successResponse(
      "Venue deleted successfully!"
    )
  );
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};