const Event = require("../models/Event");
const AppError = require("../utils/appError");

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

//Create a new event
const createEvent = async (data, userId) => {
  //For testing purposes
  //console.log("EVENT DATA: ", data);

  if (!data?.totalTickets) {
    throw new AppError("totalTickets is required", 400);
  }

  return Event.create({
    ...data,
    organizerId: userId,
    availableTickets: data.totalTickets,
  });
};

const updateEvent = async (id, data, userId, role) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (role !== "admin" && event.organizerId.toString() !== userId.toString()) {
    throw new AppError("You cannot modify this event", 403);
  }

  delete data.organizerId;
  delete data.availableTickets;

  Object.assign(event, data);

  await event.save();

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
