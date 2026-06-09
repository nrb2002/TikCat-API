const express = require("express");

const controller = require("../controllers/dashboard.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  asyncHandler(controller.getDashboardStats)
);

module.exports = router;