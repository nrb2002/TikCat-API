const express = require("express");

const controller = require("../controllers/venues.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Get all venues (public or authenticated depending on your policy)
router.get("/", asyncHandler(controller.getAllVenues));

// Get single venue
router.get("/:id", validateObjectId, asyncHandler(controller.getVenueById));

// Create venue (admin + organizer)
router.post(
  "/",
  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.createVenue),
);

// Update venue
router.put(
  "/:id",
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.updateVenue),
);

// Delete venue (admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  asyncHandler(controller.deleteVenue),
);

module.exports = router;
