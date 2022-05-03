'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        user_id: 4,
        title: 'The 1000 Sunny',
        description: 'Join our crew on the 1000 Sunny! A new adventure everyday! I will be King of the Pirates!',
        createdAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
}
