const { Ticket } = require('../../models');

const createTicket = async (req, res) => {
  const { title, description, status, assignedTo, from } = req.body;
  try {
    const ticket = await Ticket.create({ title, description, status, assignedTo, from });
    res.send(ticket);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createTicket;
