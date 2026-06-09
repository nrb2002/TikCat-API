const venueService = require("../services/venues.service");

const getAllVenues = async (req, res) => {
  const venues = await venueService.getAllVenues();

  res.status(200).json(venues);
};

const getVenueById = async (req, res) => {
  const venue = await venueService.getVenueById(req.params.id);

  if (!venue) {
    return res.status(404).json({
      message: "Venue not found",
    });
  }

  res.status(200).json(venue);
};

const createVenue = async (req, res) => {
  const venue = await venueService.createVenue(req.body);

  res.status(201).json(venue);
};

const updateVenue = async (req, res) => {
  const venue = await venueService.updateVenue(req.params.id, req.body);

  if (!venue) {
    return res.status(404).json({
      message: "Venue not found",
    });
  }

  res.status(200).json(venue);
};

const deleteVenue = async (req, res) => {
  const venue = await venueService.deleteVenue(req.params.id);

  if (!venue) {
    return res.status(404).json({
      message: "Venue not found",
    });
  }

  res.status(204).send();
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};
