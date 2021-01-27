'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Song, { through: FavoritSong })
      User.belongsToMany(models.Album, { through: FavoritAlbum })
      User.belongsToMany(models.Playlist, { through: FavoritPlaylist })
      User.belongsToMany(models.Song, { through: Playlist })
    }
  };
  User.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    no_telp: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};