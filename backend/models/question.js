const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Quiz, { foreignKey: 'quiz_id' });
      Question.hasMany(models.Option, { foreignKey: 'question_id', as: 'options' });
      Question.hasMany(models.Response, { foreignKey: 'question_id', as: 'responses' });
    }
  }

  Question.init(
    {
      type: {
        type: DataTypes.ENUM('multi-selection', 'true-false', 'matching', 'free-input'),
        allowNull: false,
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      time_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Quizzes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );

  return Question;
};
