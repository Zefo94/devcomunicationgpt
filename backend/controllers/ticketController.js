const { Ticket } = require('../models');

const createTicket = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const ticket = await Ticket.create({ title, description, status, assignedTo });
  res.send(ticket);
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.findAll();
  res.send(tickets);
};

const getTicketById = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  res.send(ticket);
};

const updateTicket = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  await ticket.update({ title, description, status, assignedTo });
  res.send(ticket);
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  await ticket.destroy();
  res.send({ message: 'Ticket deleted' });
};

const reassignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { newAssignedTo } = req.body;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }
    ticket.assignedTo = newAssignedTo;
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  reassignTicket,
};
