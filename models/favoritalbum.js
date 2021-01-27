'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoritAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FavoritAlbum.init({
    UserId: DataTypes.INTEGER,
    AlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoritAlbum',
  });
  return FavoritAlbum;
};