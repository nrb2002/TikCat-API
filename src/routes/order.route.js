const router = require("express").Router();

const orderController = require("../controllers/order.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const validateOrder = require("../validation/order.validation");
const validateObjectId = require("../middleware/validateObjectId");
const validate = require("../middleware/validate");

/* =========================
   GET ALL ORDERS (ADMIN ONLY)
========================= */
router.get("/", authenticate, authorize("admin"), orderController.getAllOrders);

/* =========================
   GET USER ORDERS (LOGGED-IN USER)
========================= */
router.get("/my-orders", authenticate, orderController.getMyOrders);

/* =========================
   GET ORDER BY ID
========================= */
router.get(
  "/:id",
  authenticate,
  validateObjectId,
  orderController.getOrderById,
);

/* =========================
   CREATE ORDER (USER)
========================= */
router.post(
  "/",
  authenticate,
  validateOrder,
  validate,
  orderController.createOrder,
);

/* =========================
   UPDATE ORDER (ADMIN ONLY)
========================= */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  validateOrder,
  validate,
  orderController.updateOrder,
);

/* =========================
   DELETE ORDER (ADMIN ONLY)
========================= */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  orderController.deleteOrder,
);

module.exports = router;
