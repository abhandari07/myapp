const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.belongsTo(models.User, { foreignKey: 'user_id' });
      Quiz.hasMany(models.Question, { foreignKey: 'quiz_id', as: 'questions' });
    }
  }

  Quiz.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      access_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Quiz',
    }
  );

  return Quiz;
};
