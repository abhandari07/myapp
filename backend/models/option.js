const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      Option.belongsTo(models.Question, { foreignKey: 'question_id' });
      Option.hasMany(models.Response, { foreignKey: 'option_id', as: 'responses' });
    }
  }

  Option.init(
    {
      option_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Option',
    }
  );

  return Option;
};
