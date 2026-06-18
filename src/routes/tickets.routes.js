const express = require("express");

const ticketController = require("../controllers/tickets.controller");

const authenticate = require("../middleware/authenticate");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();


/*********************************
 * USER TICKET ACCESS
 *********************************/


/**
 * GET MY TICKETS
 * Logged-in user only
 */
router.get(
  "/my-tickets",

  /*
    #swagger.tags = ['Tickets']
    #swagger.summary = 'Get logged-in user tickets'
    #swagger.description =
    'Returns tickets purchased by the authenticated user.'

    #swagger.security = [{
      "BearerAuth":[]
    }]
  */

  authenticate,
  asyncHandler(ticketController.getMyTickets),
);



/**
 * GET MY TICKET BY ID
 * Logged-in user only
 */
router.get(
  "/:id",

  /*
    #swagger.tags = ['Tickets']
    #swagger.summary = 'Get my ticket by ID'

    #swagger.security = [{
      "BearerAuth":[]
    }]
  */

  authenticate,
  validateObjectId("id"),
  asyncHandler(ticketController.getMyTicketById),
);



/**
 * DOWNLOAD / VIEW QR CODE
 * Logged-in user only
 */
router.get(
  "/:id/qrcode",

  /*
    #swagger.tags = ['Tickets']
    #swagger.summary = 'Get ticket QR code'

    #swagger.security = [{
      "BearerAuth":[]
    }]
  */

  authenticate,
  validateObjectId("id"),
  asyncHandler(ticketController.getTicketQRCode),
);




module.exports = router;