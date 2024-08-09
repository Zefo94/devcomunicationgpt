'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Messages', 'attachmentUrl', {
      type: Sequelize.STRING,
      allowNull: true, // Permite que sea nulo si no siempre habrá un archivo adjunto
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Messages', 'attachmentUrl');
  }
};
