const { Ticket } = require('../../models');

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) {
    return res.status(404).send({ error: 'Ticket not found' });
  }
  await ticket.destroy();
  res.send({ message: 'Ticket deleted' });
};

module.exports = deleteTicket;
