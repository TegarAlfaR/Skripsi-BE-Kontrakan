"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Payments", [
      {
        user_id: 2,
        tenant_name: "budi riko",
        amount: 700000,
        payment_date: new Date(),
        notes: "sudah lunas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        tenant_name: "linda amelia",
        amount: 700000,
        payment_date: new Date(),
        notes: "sudah lunas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        tenant_name: "wahyu sinanta",
        amount: 1000000,
        payment_date: new Date(),
        notes: "sudah lunas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payments", null, {});
  },
};
