const { Ticket, User, Message } = require('../models');

const reassignTicketAutomatically = async (ticketId) => {
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    throw new Error('Ticket not found');
  }

  const availableAgents = await User.findAll({
    where: { status: 'online', role: 'agent' },
    include: [{ model: Ticket, as: 'tickets' }]
  });

  if (availableAgents.length === 0) {
    throw new Error('No agents available');
  }

  // Encontrar el agente con menos tickets asignados
  let agentWithLeastTickets = availableAgents[0];
  for (const agent of availableAgents) {
    if (agent.tickets.length < agentWithLeastTickets.tickets.length) {
      agentWithLeastTickets = agent;
    }
  }

  ticket.assignedTo = agentWithLeastTickets.id;
  await ticket.save();
  return ticket;
};

const createTicket = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const ticket = await Ticket.create({ title, description, status, assignedTo });
  
  // Reasignación automática si no se proporciona un agente asignado
  if (!assignedTo) {
    const reassignedTicket = await reassignTicketAutomatically(ticket.id);
    return res.send(reassignedTicket);
  }

  res.send(ticket);
};

const createTicketFromMessage = async (message) => {
  const ticket = await Ticket.create({
    title: `Ticket from ${message.sender.pushname}`,
    description: message.body,
    status: 'open',
    assignedTo: null,
  });

  await Message.create({
    ticketId: ticket.id,
    from: message.from,
    body: message.body
  });

  await reassignTicketAutomatically(ticket.id);
  return ticket;
};

const getTickets = async (req, res) => {
  const userId = req.user.id;
  const tickets = await Ticket.findAll({ where: { assignedTo: userId } });
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

const setAutoResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const autoResponse = await AutoResponse.create({ message });
    res.send(autoResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createTicket,
  //createTicketFromMessage,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  reassignTicket,
  reassignTicketAutomatically,
  createTicketFromMessage, // Exporta la función
  setAutoResponse,
};
