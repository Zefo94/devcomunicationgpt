'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.User, {
        foreignKey: 'assignedTo',
        as: 'assignedUser'
      });
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    assignedTo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
