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
  authenticate,
  authorize("admin", "organizer"),
  asyncHandler(controller.getAllTickets),
);

// Get single ticket
router.get(
  "/:id",
  authenticate,
  validateObjectId,
  asyncHandler(controller.getTicketById),
);

// Validate ticket (QR scan / check-in)
router.patch(
  "/:id/validate",
  authenticate,
  authorize("admin", "organizer"),
  validateObjectId,
  asyncHandler(controller.validateTicket),
);

module.exports = router;
