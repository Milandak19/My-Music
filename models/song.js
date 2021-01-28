'use strict';
const axios = require('axios');
const CircularJSON = require('circular-json')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Album, { foreignKey: 'AlbumId' })
      Song.belongsToMany(models.User, { through: models.FavoritSong })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    embed_url: DataTypes.STRING,
    AlbumId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (song, options) => {
        axios.get(`https://api.deezer.com/search/track?q=${song.title}`)
          .then(data => {
            song.embed_url = data.data.data[0].id
          })
          .catch(err => {
            console.log(err);
          })
        if (!song.AlbumId) {
          song.AlbumId = null
        }
      }
    },
    sequelize,
    modelName: 'Song',
  });
  return Song;
};