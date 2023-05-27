const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParticipantQuiz extends Model {
    static associate(models) {
      ParticipantQuiz.belongsTo(models.User, { foreignKey: 'user_id' });
      ParticipantQuiz.belongsTo(models.Quiz, { foreignKey: 'quiz_id' });
    }
  }

  ParticipantQuiz.init(
    {
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endedAt: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
      modelName: 'ParticipantQuiz',
    }
  );

  return ParticipantQuiz;
};
