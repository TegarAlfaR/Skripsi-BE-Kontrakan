"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Detail_units", [
      {
        unit_id: 1,
        total_rooms: 4,
        livingroom: 1,
        bathroom: 1,
        kitchen: 1,
        bedroom: 1,
        electricity_type: "prabayar",
        water_access: "privated",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unit_id: 2,
        total_rooms: 5,
        livingroom: 1,
        bathroom: 1,
        kitchen: 1,
        bedroom: 2,
        electricity_type: "pascabayar",
        water_access: "privated",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Detail_units", null, {});
  },
};
