'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Units', {
      unit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      unit_name: {
        type: Sequelize.STRING
      },
      rental_price: {
        type: Sequelize.FLOAT
      },
      phone_number: {
        type: Sequelize.STRING
      },
      unit_photo: {
        type: Sequelize.TEXT
      },
      total_units: {
        type: Sequelize.INTEGER
      },
      unit_availability: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Units');
  }
};