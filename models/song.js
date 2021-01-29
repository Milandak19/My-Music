// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Song extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Song.belongsTo(models.Album, { foreignKey: 'AlbumId' })
//       Song.belongsToMany(models.User, { through: models.FavoritSong })
//     }
//   };
//   Song.init({
//     title: DataTypes.STRING,
//     embed_url: DataTypes.STRING,
//     AlbumId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Song',
//   });
//   return Song;
// };
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
        let a = '';
        for (let i = 0; i < song.embed_url.length; i++) {
          if (song.embed_url[i] === '1' || song.embed_url[i] === '2' || song.embed_url[i] === '3' || song.embed_url[i] === '4' || song.embed_url[i] === '5' || song.embed_url[i] === '6' || song.embed_url[i] === '7' || song.embed_url[i] === '8' || song.embed_url[i] === '9' || song.embed_url[i] === '0') {
            a += song.embed_url[i]
          }
        }
        song.embed_url = a
      }
    },
    sequelize,
    modelName: 'Song',
  });
  return Song;
};