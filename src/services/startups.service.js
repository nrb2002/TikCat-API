const Startup = require("../models/startups.model");

// Get all Startups
const getAllStartups = async () => {
  return await Startup.find();
};

// Get single Startup
const getSingleStartup = async (id) => {
  return await Startup.findById(id);
};

// Create Startup
const createStartup = async (startupData) => {
  return await Startup.create(startupData);
};

// Update Startup
const updateStartup = async (id, updatedData) => {
  return await Startup.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

// Delete Startup
const deleteStartup = async (id) => {
  return await Startup.findByIdAndDelete(id);
};

module.exports = {
  getAllStartups,
  getSingleStartup,
  createStartup,
  updateStartup,
  deleteStartup,
};
