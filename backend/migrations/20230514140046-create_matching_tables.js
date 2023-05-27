'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MatchingQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quiz_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Quizzes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('MatchingOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      match_text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      matching_question_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'MatchingQuestions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('MatchingOptions');
    await queryInterface.dropTable('MatchingQuestions');
  }
};
