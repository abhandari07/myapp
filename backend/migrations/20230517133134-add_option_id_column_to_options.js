module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Options', 'option_id', {
      type: Sequelize.INTEGER, // Adjust the data type according to your needs
      allowNull: true, // Adjust the allowNull value if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Options', 'option_id');
  },
};
