const express = require("express");

const controller = require("../controllers/tickets.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Get all tickets (Admin + Organizer only recommended for security)
router.get(
  "/",
  /* 
    #swagger.tags = ['Tickets']
    #swagger.summary = 'Get all Tickets'
    #swagger.responses[200] = {
      description: 'List of tickets',
      schema: [{ $ref: '#/definitions/Ticket' }]
    }
  */
  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.getAllTickets),
);

// Get single ticket
router.get(
  "/:id",
  /* 
    #swagger.tags = ['Tickets']
    #swagger.summary = 'Get Ticket by ID (Admins and Organizers only)'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Ticket ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Order' }
    }
    #swagger.responses[404] = {
      description: 'Order not found'
    }
  */
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId("id"),
  asyncHandler(controller.getTicketById),
);

// Validate ticket (QR scan / check-in)
router.patch(
  "/:id/validate",
  /* 
  #swagger.tags = ['Tickets']
  #swagger.summary = 'Validate ticket (Admins and Organizers only)'
  #swagger.description = 'QR scan / check-in: Marks a ticket as used after entry validation.'
  #swagger.security = [{
    "BearerAuth": []
  }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Ticket ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Ticket validated successfully'
  }
*/
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId("id"),
  asyncHandler(controller.validateTicket),
);

module.exports = router;
