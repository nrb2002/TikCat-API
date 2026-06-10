const express = require("express");

const controller = require("../controllers/orders.controller");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

//Get all orders
router.get(
  "/",
  /* 
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get all Orders'
    #swagger.responses[200] = {
      description: 'List of orders',
      schema: [{ $ref: '#/definitions/Order' }]
    }
  */
  authenticate,
  controller.getAllOrders,
);

//Get order by ID
router.get(
  "/:id",
  /* 
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get Order by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Order ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Order' }
    }
    #swagger.responses[404] = {
      description: 'Order not found'
    }
  */
  authenticate,
  controller.getOrderById,
);

//Create a new order
router.post(
  "/",
  /* 
        #swagger.tags = ['Orders']
        #swagger.summary = 'Purchase tickets'
        #swagger.description = 'Creates an order and generates event tickets.'
        #swagger.security = [{
            "BearerAuth": []
        }]
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Order information',
            required: true,
            schema: {
            eventId: '684b2d6a1234567890123456',
            quantity: 2
            }
        }
        #swagger.responses[201] = {
            description: 'Order created successfully'
        }
        #swagger.responses[400] = {
            description: 'Insufficient tickets available'
        }
        #swagger.responses[404] = {
            description: 'Event not found'
        }
        */
  authenticate,
  controller.createOrder,
);

module.exports = router;
