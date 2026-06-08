const router = require("express").Router();

const ticketController = require("../controllers/ticket.controller");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validateObjectId = require("../middleware/validateObjectId");

const validateTicket = require("../validation/ticket.validation");
const validate = require("../middleware/validate");

/* =========================
   GET ALL TICKETS
========================= */
router.get("/", ticketController.getAllTickets);

/* =========================
   GET TICKET BY ID
========================= */
router.get("/:id", validateObjectId, ticketController.getTicketById);

/* =========================
   CREATE TICKET (ADMIN ONLY)
========================= */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateTicket,
  validate,
  ticketController.createTicket,
);

/* =========================
   UPDATE TICKET (ADMIN ONLY)
========================= */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  validateTicket,
  validate,
  ticketController.updateTicket,
);

/* =========================
   DELETE TICKET (ADMIN ONLY)
========================= */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  ticketController.deleteTicket,
);

module.exports = router;
