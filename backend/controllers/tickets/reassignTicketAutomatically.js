const { Ticket, User } = require('../../models');

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

module.exports = reassignTicketAutomatically;
