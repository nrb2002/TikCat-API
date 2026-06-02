// Import dependencies
const express = require("express");
const router = express.Router();

// Import validation and middleware
const startupValidationRules = require("../validation/startup.validation"); // Import validation rules
const validate = require("../middleware/validate"); // Import validation middleware
const validateObjectId = require("../middleware/validateObjectId"); // Import ObjectId validator
const authenticate = require("../middleware/authenticate"); // Import authentication middleware
const authorize = require("../middleware/authorize"); // Import authorization middleware

// Import controller functions
const {
  getSingleStartup,
  getAllStartups,
  createStartup,
  updateStartup,
  deleteStartup,
} = require("../controllers/startups.controller");

/* =========================
   PUBLIC ROUTES
========================= */

// GET all startups
router.get("/", getAllStartups);

// GET single startup
router.get("/:id", validateObjectId, getSingleStartup);

/* =========================
   PROTECTED ROUTES
========================= */

// CREATE startup
router.post(
  "/",
  authenticate,
  authorize("Admin", "Founder"),
  startupValidationRules(),
  validate,
  createStartup,
);

// UPDATE startup
router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Founder"),
  validateObjectId,
  startupValidationRules(),
  validate,
  updateStartup,
);

// DELETE startup
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  validateObjectId,
  deleteStartup,
);

module.exports = router;
