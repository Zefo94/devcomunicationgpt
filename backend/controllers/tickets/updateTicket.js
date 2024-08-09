const { Ticket } = require('../../models');

const updateTicket = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  await ticket.update({ title, description, status, assignedTo });
  res.send(ticket);
};

module.exports = updateTicket;
