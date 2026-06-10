const express = require("express");

const controller = require("../controllers/dashboard.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/stats",

  /* 
    #swagger.tags = ['Dashboard']
    #swagger.summary = 'Get dashboard statistics'
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.responses[200] = {
      schema: {
        totalUsers: 100,
        totalEvents: 25,
        totalOrders: 450,
        revenue: 25000
      }
    }
  */

  authenticate,
  authorize("admin"),
  asyncHandler(controller.getDashboardStats),
);

module.exports = router;
