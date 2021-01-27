'use strict';
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
      Song.belongsToMany(models.User, { through: FavoritSong })
      Song.belongsToMany(models.User, { through: Playlist })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    embed_url: DataTypes.STRING,
    AlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};