const { Ticket } = require('../../models');

const getTicketById = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  res.send(ticket);
};

module.exports = getTicketById;
