'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        album_name: 'Sempiternal',
        released_year: 2013,
        band_name: 'Bring Me The Horrizon',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        album_name: 'Lagi Sedih',
        band_name: 'Slank',
        released_year: 2014,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        album_name: 'What Do You Really Know?',
        band_name: 'Reality Club',
        released_year: 2019,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        album_name: 'A Rush of Blood to the Head',
        band_name: 'Coldplay',
        released_year: 2014,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Albums', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
