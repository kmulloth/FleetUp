'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'captain@crunch.io',
        username: 'Capn-Crunch',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'Jack_Sparrow@blkprl.io',
        username: 'CaptJSparrow',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'PirateKing@going.merry',
        username: 'MonkeyDLuffy',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'EKenway@jackdaw.uk',
        username: 'EdKenway',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'BlkBrd@Tortuga.is',
        username: 'BlkBrd',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'Zoro@going.merry',
        username: 'OniZoro',
        hashedPassword: bcrypt.hashSync('password7')
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}
