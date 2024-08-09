const getTickets = async (req, res) => {
  const userId = req.user.id;
  const tickets = await Ticket.findAll({
    where: {
      assignedTo: userId,
      status: {
        [Op.not]: 'closed'  // Asegúrate de importar Op desde Sequelize
      }
    }
  });
  res.send(tickets);
};
