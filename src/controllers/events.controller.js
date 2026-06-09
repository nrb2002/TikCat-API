const eventService = require("../services/events.service");
const AppError = require("../utils/AppError");

const getAllEvents = async (req, res) => {
  const events = await eventService.getAllEvents();

  res.status(200).json(events);
};

const getEventById = async (req, res) => {
  const event = await eventService.getEventById(req.params.id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json(event);
};

const createEvent = async (req, res) => {
  const event = await eventService.createEvent(req.body, req.user.userId);

  res.status(201).json(event);
};

const updateEvent = async (req, res) => {
  const event = await eventService.updateEvent(req.params.id, req.body);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json(event);
};

const deleteEvent = async (req, res) => {
  const event = await eventService.deleteEvent(req.params.id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(204).send();
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
