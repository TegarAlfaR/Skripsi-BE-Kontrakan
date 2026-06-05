"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.hasOne(models.Detail_unit, {
        foreignKey: "unit_id",
        as: "detail_unit",
      });
    }
  }
  Unit.init(
    {
      unit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      unit_name: DataTypes.STRING,
      rental_price: DataTypes.FLOAT,
      phone_number: DataTypes.STRING,
      unit_photo: DataTypes.ARRAY(DataTypes.TEXT),
      total_units: DataTypes.INTEGER,
      unit_availability: DataTypes.INTEGER,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Unit",
    }
  );
  return Unit;
};
