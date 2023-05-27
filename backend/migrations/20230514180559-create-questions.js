'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      question_type: {
        type: Sequelize.ENUM('multiple_choice', 'true_false', 'matching', 'free_input'),
        allowNull: false,
      },
      items: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      matches: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      correctPairs: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Quizzes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  },
};
