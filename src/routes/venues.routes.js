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
    #swagger.summary = 'Create venue (Admins or Organizers only)'
    #swagger.security = [{
      "BearerAuth": []
    }]
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
    #swagger.summary = 'Update venue (Admins or Organizers only)'
    #swagger.security = [{
      "BearerAuth": []
    }]
  
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
  */
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteVenue),
);

module.exports = router;
