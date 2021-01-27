'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Song)
      Album.belongsToMany(models.User, { through: FavoritAlbum })
    }
  };
  Album.init({
    album_name: DataTypes.STRING,
    band_name: DataTypes.STRING,
    released_year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};