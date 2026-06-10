const express = require("express");

const controller = require("../controllers/events.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(controller.getAllEvents));

router.get("/:id", validateObjectId, asyncHandler(controller.getEventById));

router.post(
  "/",

  /* 
    #swagger.tags = ['Events']
    #swagger.summary = 'Create event'
    #swagger.description = 'Creates a new event.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Event information',
      required: true,
      schema: {
        title: 'Tech Conference 2026',
        description: 'Annual technology conference',
        categoryId: '684b2d6a1234567890123456',
        venueId: '684b2d6a1234567890123457',
        eventDate: '2026-12-15',
        startTime: '09:00',
        endTime: '17:00',
        ticketPrice: 50,
        totalTickets: 500,
        imageUrl: 'https://example.com/event.jpg',
        status: 'Published'
      }
    }
    #swagger.responses[201] = {
      description: 'Event created successfully'
    }
  */

  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.createEvent),
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.updateEvent),
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.deleteEvent),
);

module.exports = router;
