const router = require('express').Router();
const orderController = require('../controllers/order.controller');

router.get('/', order.controller.getAllOrders);
router.get('/:id', order.controller.getOrderById);
router.post('/', order.controller.createOrder);
router.put('/:id', order.controller.updateOrder);
router.delete('/:id', order.controller.deleteOrder);

module.exports = router;