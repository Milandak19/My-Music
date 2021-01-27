'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoritSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FavoritSong.init({
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoritSong',
  });
  return FavoritSong;
};