const express = require("express");

const controller = require("../controllers/orders.controller");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, controller.getAllOrders);

router.get("/:id", authenticate, controller.getOrderById);

router.post("/", authenticate, controller.createOrder);

module.exports = router;
