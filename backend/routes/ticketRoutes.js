const express = require('express');
const router = express.Router();
const closeTicket = require('../controllers/tickets/closeTicket');
const auth = require('../middleware/auth');

const createTicket = require('../controllers/tickets/createTicket');
const createTicketFromMessage = require('../controllers/tickets/createTicketFromMessage');
const getTickets = require('../controllers/tickets/getTickets');
const getTicketById = require('../controllers/tickets/getTicketById');
const updateTicket = require('../controllers/tickets/updateTicket');
const deleteTicket = require('../controllers/tickets/deleteTicket');
const reassignTicket = require('../controllers/tickets/reassignTicket');
const setAutoResponse = require('../controllers/tickets/setAutoResponse');


// Rutas para CRUD de tickets
router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/:id', auth, getTicketById);
router.put('/:id', auth, updateTicket);
router.delete('/:id', auth, deleteTicket);
router.put('/:id/close', auth, closeTicket);

// Rutas para reasignar y auto respuesta
router.post('/reassign/:id', auth, reassignTicket);
router.post('/setAutoResponse', auth, setAutoResponse);

module.exports = router;
