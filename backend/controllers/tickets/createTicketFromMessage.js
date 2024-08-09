const { Ticket, Message } = require('../../models');
const reassignTicketAutomatically = require('./reassignTicketAutomatically');

const createTicketFromMessage = async (message) => {
  const existingTicket = await Ticket.findOne({
    where: {
      from: message.from,
      status: 'open'
    }
  });

  if (existingTicket) {
    await Message.create({
      ticketId: existingTicket.id,
      from: message.from,
      body: message.body
    });
    return existingTicket;
  } else {
    const ticket = await Ticket.create({
      title: `Ticket from ${message.sender.pushname}`,
      description: message.body,
      status: 'open',
      from: message.from,
      assignedTo: null
    });
    await Message.create({
      ticketId: ticket.id,
      from: message.from,
      body: message.body
    });
    await reassignTicketAutomatically(ticket.id);
    return ticket;
  }
};

module.exports = createTicketFromMessage;
