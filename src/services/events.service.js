const Event = require("../models/Event");
const AppError = require("../utils/AppError");

const getAllEvents = async () => {
  return Event.find()
    .populate("categoryId")
    .populate("venueId")
    .populate("organizerId", "firstName lastName email")
    .sort({ eventDate: 1 });
};

const getEventById = async (id) => {
  const event = await Event.findById(id)
    .populate("categoryId")
    .populate("venueId")
    .populate("organizerId", "firstName lastName email");

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

const createEvent = async (data, organizerId) => {
  if (!data?.totalTickets) {
    throw new AppError("totalTickets is required", 400);
  }

  return Event.create({
    ...data,
    organizerId,
    availableTickets: data.totalTickets,
  });
};

const updateEvent = async (id, data) => {
  // prevent critical field tampering
  delete data.organizerId;
  delete data.availableTickets;

  const event = await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

const getEventsByCategory = async (categoryId) => {
  return Event.find({ categoryId });
};

const getEventsByOrganizer = async (organizerId) => {
  return Event.find({ organizerId });
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getEventsByOrganizer,
};
