'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detail_units', {
      detail_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unit_id: {
        type: Sequelize.INTEGER
      },
      total_rooms: {
        type: Sequelize.INTEGER
      },
      livingroom: {
        type: Sequelize.INTEGER
      },
      bathroom: {
        type: Sequelize.INTEGER
      },
      kitchen: {
        type: Sequelize.INTEGER
      },
      bedroom: {
        type: Sequelize.INTEGER
      },
      electricity_type: {
        type: Sequelize.STRING
      },
      water_access: {
        type: Sequelize.ENUM('shared', 'privated')
      },
      description: {
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
    await queryInterface.dropTable('Detail_units');
  }
};