'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AutoResponse extends Model {
    static associate(models) {
      // define association here if needed in the future
    }
  }
  AutoResponse.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AutoResponse',
  });
  return AutoResponse;
};
