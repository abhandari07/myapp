module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'matchingOptions', {
      type: Sequelize.STRING, // Adjust the data type according to your needs
      allowNull: true, // Adjust the allowNull value if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'matchingOptions');
  },
};
