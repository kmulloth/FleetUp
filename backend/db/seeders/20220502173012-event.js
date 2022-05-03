'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        user_id: 4,
        name: 'Find the One Piece!',
        body: 'Join our crew on the 1000 Sunny! A new adventure everyday! I will be King of the Pirates!',
        attending: 8
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
}
