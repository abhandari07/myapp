'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'question_type', {
      type: Sequelize.ENUM('multiple_choice', 'true_false', 'matching', 'free_input'),
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Questions', 'question_type');
  },
};
