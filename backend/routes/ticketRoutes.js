const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// Ruta para reasignar un ticket
router.post('/reassign/:id', auth, ticketController.reassignTicket);

// Rutas para CRUD de tickets
router.post('/', auth, ticketController.createTicket);
router.get('/', auth, ticketController.getTickets);
router.get('/:id', auth, ticketController.getTicketById);
router.put('/:id', auth, ticketController.updateTicket);
router.delete('/:id', auth, ticketController.deleteTicket);

//Rura para  configurar el mensaje de auto respuesta
router.post('/setAutoResponse', auth, ticketController.setAutoResponse)

module.exports = router;
