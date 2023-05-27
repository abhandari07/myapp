module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'correctPairs', {
      type: Sequelize.STRING, // Adjust the data type according to your needs
      allowNull: true, // Adjust the allowNull value if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'correctPairs');
  },
};
