'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Ticket, {
        foreignKey: 'assignedTo',
        as: 'tickets'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    autoResponseMessage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
