'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        user_id: 4,
        imgUrl: 'https://getwallpapers.com/wallpaper/full/2/d/e/1089439-free-one-piece-crew-wallpaper-2560x1600-high-resolution.jpg',
        name: 'Find the One Piece!',
        body: 'Join our crew on the 1000 Sunny! A new adventure everyday! I will be King of the Pirates!',
        attending: 8
      },
      {
        user_id: 3,
        imgUrl: 'https://images8.alphacoders.com/636/636768.jpg',
        name: 'Hunt for the Black Pearl',
        body: 'That fish-breathed tentacle-bearded louse Davy Jones has pilfered me beloved ship again. I require all hands on deck in order to retrieve her.',
        attending: 0
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
}
