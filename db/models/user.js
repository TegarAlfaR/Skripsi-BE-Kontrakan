"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Unit, {
        foreignKey: "user_id",
        as: "unit",
      });
      User.hasMany(models.Booking, {
        foreignKey: "user_id",
        as: "booking",
      });
      User.hasMany(models.Payment, {
        foreignKey: "user_id",
        as: "payment",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: DataTypes.STRING,
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      profile_photo: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
