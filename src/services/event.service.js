const Event = require("../models/Event");

const getAllEvents = async () => {
  return Event.find()
    .populate("categoryId")
    .populate("venueId")
    .populate("organizerId", "firstName lastName email")
    .sort({ eventDate: 1 });
};

const getEventById = async (id) => {
  return Event.findById(id)
    .populate("categoryId")
    .populate("venueId")
    .populate("organizerId", "firstName lastName email");
};

const createEvent = async (data, organizerId) => {
  return Event.create({
    ...data,
    organizerId,
    availableTickets: data.totalTickets,
  });
};

const updateEvent = async (id, data) => {
  return Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteEvent = async (id) => {
  return Event.findByIdAndDelete(id);
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
