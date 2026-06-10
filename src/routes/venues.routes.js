const express = require("express");

const controller = require("../controllers/venues.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Get all venues (public or authenticated depending on your policy)
router.get(
  "/",
  /**
    #swagger.tags = ['Venues']
    #swagger.summary = 'Get all venues'
   */
  asyncHandler(controller.getAllVenues),
);

// Get single venue
router.get(
  "/:id",
  /**
    #swagger.tags = ['Venues']
    #swagger.summary = 'Get venue by ID'
   */
  validateObjectId,
  asyncHandler(controller.getVenueById),
);

// Create venue (admin + organizer)
router.post(
  "/",
  /* 
    #swagger.tags = ['Venues']
    #swagger.summary = 'Create Venue (Admins and Organizers only)'
    #swagger.description = 'Creates a new venue.'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Venue information',
      required: true,
      schema: {
        name: 'Grand Hall',
        address: '123 Main Street',
        city: 'Kinshasa',
        capacity: 1000,
        contactPhone: '+243812345678',
        imageUrl: 'https://example.com/venue.jpg',
        ownerId: '684b2d6a1234567890123456'
      }
    }
    #swagger.responses[201] = {
      description: 'Venue created successfully'
    }
  */
  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.createVenue),
);

// Update venue
router.put(
  "/:id",
  /* 
  #swagger.tags = ['Venues']
  #swagger.summary = 'Update venue (Admins and Organizers only)'
  #swagger.description = 'Updates venue information.'
  #swagger.security = [{
    "BearerAuth": []
  }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Venue ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated venue information',
    required: true,
    schema: {
      name: 'Grand Hall Renovated',
      address: '456 Updated Avenue',
      city: 'Kinshasa',
      capacity: 1200,
      contactPhone: '+243812345678'
    }
  }
  #swagger.responses[200] = {
    description: 'Venue updated successfully!'
  }
*/
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.updateVenue),
);

// Delete venue (admin only)
router.delete(
  "/:id",
  /*
    #swagger.tags = ['Venues']
    #swagger.summary = 'Delete venue (Admins only)'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Venue ID',
      required: true,
      type: 'string'
    }
  */
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteVenue),
);

module.exports = router;
