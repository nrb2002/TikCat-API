const service = require("../services/events.service");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const formatResponse = require("../utils/formatResponse");

// Get all events
const getAllEvents = async (req, res) => {
  const events = await service.getAllEvents();

  return res.status(200).json(
    formatResponse({
      success: true,
      message: events.length
        ? "Events retrieved successfully"
        : "No events found!",
      data: events,
    })
  );
};

// Get event by id
const getEventById = async (req, res) => {
  const event = await service.getEventById(req.params.id);

  if (!event) {
    throw new AppError("Event not found!", 404);
  }

  return res.status(200).json(
    successResponse("Event retrieved successfully!", event)
  );
};

// Create a new event
const createEvent = async (req, res) => {
  const event = await service.createEvent(req.body, req.user._id);

  return res.status(201).json(
    successResponse("Event created successfully!", event)
  );
};

// Update event
const updateEvent = async (req, res) => {
  const event = await service.updateEvent(
    req.params.id,
    req.body,
    req.user._id,
    req.user.role
  );

  if (!event) {
    throw new AppError("Event not found!", 404);
  }

  return res.status(200).json(
    successResponse("Event updated successfully!", event)
  );
};

// Delete event
const deleteEvent = async (req, res) => {
  const event = await service.deleteEvent(req.params.id);

  if (!event) {
    throw new AppError("Event not found!", 404);
  }

  return res.status(200).json(
    formatResponse({
      success: true,
      message: "Event deleted successfully!",
    })
  );
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
