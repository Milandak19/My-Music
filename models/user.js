'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helper/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Song, { through: models.FavoritSong })
      User.belongsToMany(models.Album, { through: models.FavoritAlbum })
    }
  };
  User.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = 'user'
        instance.password = hashing(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};