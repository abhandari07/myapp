'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FreeInputQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      correctAnswer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      items: {
        type: Sequelize.JSON,
        allowNull: true
      },
      matchingOptions: {
        type: Sequelize.JSON,
        allowNull: true
      },
      correctPairs: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FreeInputQuestions');
  }
};
