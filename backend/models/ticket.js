// models/ticket.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.hasMany(models.Message, { foreignKey: 'ticketId' });
      Ticket.belongsTo(models.User, { foreignKey: 'assignedTo' });
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignedTo: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
