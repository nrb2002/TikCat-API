const express = require("express");

const controller = require("../controllers/events.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/",
  /* 
    #swagger.tags = ['Events']
    #swagger.summary = 'Get all Events'
    #swagger.responses[200] = {
      description: 'List of events',
      schema: [{ $ref: '#/definitions/Events' }]
    }
  */
  asyncHandler(controller.getAllEvents),
);

//Get single events
router.get(
  "/:id",
  /* 
    #swagger.tags = ['Events']
    #swagger.summary = 'Get event by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Event ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Event' }
    }
    #swagger.responses[404] = {
      description: 'Event not found'
    }
  */
  validateObjectId,
  asyncHandler(controller.getEventsById),
);

//Create a new events
router.post(
  "/",

  /* 
    #swagger.tags = ['Events']
    #swagger.summary = 'Create events (Admins and Organizers only)'
    #swagger.description = 'Creates a new events.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Events information',
      required: true,
      schema: {
        title: 'Tech Conference 2026',
        description: 'Annual technology conference',
        categoryId: '684b2d6a1234567890123456',
        venueId: '684b2d6a1234567890123457',
        eventsDate: '2026-12-15',
        startTime: '09:00',
        endTime: '17:00',
        ticketPrice: 50,
        totalTickets: 500,
        imageUrl: 'https://example.com/events.jpg',
        status: 'Published'
      }
    }
    #swagger.responses[201] = {
      description: 'Events created successfully'
    }
  */

  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.createEvents),
);

//Update an existing events
router.put(
  "/:id",

  /* 
    #swagger.tags = ['Events']
    #swagger.summary = 'Update events (Admins and Organizers only)'
    #swagger.description = 'Updates an existing events.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Events ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated events information',
      required: true,
      schema: {
        title: 'Tech Conference 2026',
        description: 'Updated conference description',
        ticketPrice: 75,
        totalTickets: 750,
        status: 'Published'
      }
    }
    #swagger.responses[200] = {
      description: 'Events updated successfully'
    }
  */
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.updateEvents),
);

//Delete an events
router.delete(
  "/:id",
  /**
    #swagger.tags = ['Events']
    #swagger.summary = 'Delete events (Admins and Organizers only)'
    #swagger.description = 'Deletes an existing events.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Events ID',
      required: true,
      type: 'string'
    }
  */
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.deleteEvents),
);

module.exports = router;
