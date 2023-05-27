const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate(models) {
      Response.belongsTo(models.User, { foreignKey: 'user_id' });
      Response.belongsTo(models.Question, { foreignKey: 'question_id' });
      Response.belongsTo(models.Option, { foreignKey: 'option_id' });
    }
  }

  Response.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id',
        },
      },
      option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Options',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Response',
    }
  );

  return Response;
};
