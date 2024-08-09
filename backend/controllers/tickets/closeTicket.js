const { Ticket } = require('../../models');

const closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }

    ticket.status = 'closed'; // Cambiar el estado a "closed"
    await ticket.save();

    res.send({ message: 'Ticket closed successfully', ticket });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = closeTicket;
