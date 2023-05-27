'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('MatchingQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      question_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Quizzes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('MatchingQuestions');
  }
};
