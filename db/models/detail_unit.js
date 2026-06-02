'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_unit.init({
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unit_id: DataTypes.INTEGER,
    total_rooms: DataTypes.INTEGER,
    livingroom: DataTypes.INTEGER,
    bathroom: DataTypes.INTEGER,
    kitchen: DataTypes.INTEGER,
    bedroom: DataTypes.INTEGER,
    electricity_type: DataTypes.STRING,
    water_access: DataTypes.ENUM('shared','privated'),
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Detail_unit',
  });
  return Detail_unit;
};