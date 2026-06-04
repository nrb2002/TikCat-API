const router = require('express').Router();
const ticketController = require('../controllers/ticket.controller');

router.get('/', ticket.controller.getAllTickets);
router.get('/:id', ticket.controller.getTicketById);
router.post('/', ticket.controller.createTicket);
router.put('/:id', ticket.controller.updateTicket);
router.delete('/:id', ticket.controller.deleteTicket);

module.exports = router;