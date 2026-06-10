"use strict";
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        role: "admin",
        name: "admin",
        email: process.env.EMAIL_ADMIN,
        password: await bcrypt.hash(process.env.PASSWORD_ADMIN, 10),
        phone_number: process.env.PHONE_ADMIN,
        profile_photo:
          "https://ik.imagekit.io/epqufjrrv/boy.jpg?updatedAt=1732007400483",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "owner",
        name: "owner tegar",
        email: process.env.EMAIL_OWNER,
        password: await bcrypt.hash(process.env.PASSWORD_OWNER, 10),
        phone_number: process.env.PHONE_OWNER,
        profile_photo:
          "https://ik.imagekit.io/epqufjrrv/boy.jpg?updatedAt=1732007400483",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "owner",
        name: "udin",
        email: process.env.EMAIL_OWNER2,
        password: await bcrypt.hash(process.env.PASSWORD_OWNER2, 10),
        phone_number: process.env.PHONE_OWNER2,
        profile_photo:
          "https://ik.imagekit.io/epqufjrrv/boy.jpg?updatedAt=1732007400483",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "tenant",
        name: "rudi sanjaya",
        email: process.env.EMAIL_TENANT,
        password: await bcrypt.hash(process.env.PASSWORD_TENANT, 10),
        phone_number: process.env.PHONE_TENANT,
        profile_photo:
          "https://ik.imagekit.io/epqufjrrv/boy.jpg?updatedAt=1732007400483",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
