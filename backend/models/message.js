// models/message.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
    }
  }
  Message.init({
    ticketId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
