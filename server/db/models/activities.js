'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activities.belongsTo(models.Users, { foreignKey: 'usuarioId', allowNull: false });
    }
  }
  Activities.init({
    nameActivity: DataTypes.STRING,
    description: DataTypes.STRING,
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    status: DataTypes.STRING,
    usuarioId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Activities',
  });
  return Activities;
};