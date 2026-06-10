'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Bookings', [
     {
       user_id: 4,
       unit_id: 1,
       booking_date: new Date(),
       move_in_date: new Date(),
       tenant_name: "rudi sanjaya",
       hometown: "Jakarta",
       birth_place_date: "1990-01-01",
       gender: "Laki-laki",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
      user_id: 4,
      unit_id: 2,
      booking_date: new Date(),
      move_in_date: new Date(),
      tenant_name: "rudi sanjaya",
      hometown: "Jakarta",
      birth_place_date: "1990-01-01",
      gender: "Laki-laki",
      createdAt: new Date(),
      updatedAt: new Date(),
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {})
  }
};
