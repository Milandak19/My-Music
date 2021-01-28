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
        title: 'Politik',
        embed_url: 'https://api.deezer.com/track/3098837',
        AlbumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'In My Place',
        embed_url: 'https://api.deezer.com/track/3098838',
        AlbumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Scientist',
        embed_url: 'https://api.deezer.com/track/3098840',
        AlbumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tonk Kosong',
        embed_url: 'https://api.deezer.com/track/1146209582',
        AlbumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Prakiraan Cuaca',
        embed_url: 'https://api.deezer.com/track/1146209632',
        AlbumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Anarki Di Ri',
        embed_url: 'https://api.deezer.com/track/1146209642',
        AlbumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Prologue',
        embed_url: 'https://api.deezer.com/track/732171742',
        AlbumId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'SSR',
        embed_url: 'https://api.deezer.com/track/732171752',
        AlbumId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Can You Feel My Heart',
        embed_url: 'https://api.deezer.com/track/65245760',
        AlbumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sleepwalking',
        embed_url: 'https://api.deezer.com/track/65245764',
        AlbumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    return queryInterface.bulkInsert('Songs', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
