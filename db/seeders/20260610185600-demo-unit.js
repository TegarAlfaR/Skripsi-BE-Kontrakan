"use strict";
const dotenv = require("dotenv");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Units", [
      {
        user_id: 2,
        unit_name: "Rumah Kontrakan Tegar",
        rental_price: 700000,
        phone_number: "08123456789",
        unit_photo: [process.env.UNIT_PHOTO],
        total_units: 10,
        unit_availability: 7,
        location: "https://maps.app.goo.gl/eFfYgV1YX1fnX9PP7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        unit_name: "Rumah Kontrakan Udin",
        rental_price: 1000000,
        phone_number: "08123456789",
        unit_photo: [process.env.UNIT_PHOTO2],
        total_units: 15,
        unit_availability: 5,
        location: "https://maps.app.goo.gl/eFfYgV1YX1fnX9PP7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Units", null, {});
  },
};
