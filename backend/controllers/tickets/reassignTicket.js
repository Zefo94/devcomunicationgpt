const { Ticket } = require('../../models');

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

module.exports = reassignTicket;
