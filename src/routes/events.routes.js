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
