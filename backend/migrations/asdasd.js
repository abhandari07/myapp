
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      question_type: {
        type: Sequelize.ENUM('multiple_choice', 'true_false', 'matching', 'free_input'),
        allowNull: false,
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

    await queryInterface.createTable('MultipleChoiceQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      option: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      }
    });

    // Similarly create tables for other question types

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MultipleChoiceQuestions');
    // Drop tables for other question types
    await queryInterface.dropTable('Questions');
  }
};
