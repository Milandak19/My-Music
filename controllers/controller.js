const { Album, FavoritSong, Song, User } = require('../models')
const { encryptionPwd, checkPwd } = require('../helper/bcrypt')
const axios = require('axios');
const CircularJSON = require('circular-json')

class Controller {
  static home(req, res) {
    res.render('home')
  }
  static loginGet(req, res) {
    res.render('login')
  }
  static loginPost(req, res) {
    let input = req.body;
    User.findAll({
      where: {
        username: input.username
      }
    })
      .then(data => {
        let password = checkPwd(input.password, data[0].password)
        if (password && data.length !== 0) {
          console.log(data);
          req.session.userId = data[0].id
          req.session.username = data[0].username
          if (data[0].role === 'admin') {
            res.redirect('/admin')
          } else {
            res.redirect(`/${req.session.username}`)
          }
        } else {
          res.redirect('/login')
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
  static registerGet(req, res) {
    res.render('register')
  }
  static registerPost(req, res) {
    let data = req.body
    console.log(data);
    data.password = encryptionPwd(data.password)
    User.create(data)
      .then(data => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static userHome(req, res) {
    let username = req.params.username

    Song.findAll({
      include: {
        model: User
      }
    })
      .then(data => {
        res.render('userHome', { username, data })
      })
  }
  static musicPlayer(req, res) {
    axios.get(`https://api.deezer.com/track/${req.params.embedUrl}`)
      .then(data => {
        let json = CircularJSON.stringify(data.data);
        let temp = JSON.parse(json)
        res.render('musicPlayer', { temp })
      })
      .catch(function (error) {
        res.send(error.message)
      })
  }
  static addFavoritSong(req, res) {
    let data = {
      UserId: req.session.userId,
      SongId: req.params.songId
    }

    FavoritSong.create(data)
      .then(() => {
        res.redirect(`/${req.session.username}`)
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static logout(req, res) {
    req.session.destroy((err) => {
      res.redirect('/login')
    })
  }
  static adminPage(req, res) {
    res.render('adminPage')
  }
  static addNewSong(req, res) {
    res.render('addSongPage')
  }
  static addNewAlbum(req, res) {
    res.render('addAlbum')
  }
  static search(req, res) {
    let search = req.body.search
    axios.get(`https://api.deezer.com/search?q=${search}`)
      .then(data => {
        let json = CircularJSON.stringify(data.data.data[0]);
        let temp = JSON.parse(json)
        let username = req.session.username
        res.render('musicPlayer', { temp, username })
      })
      .catch(function (error) {
        res.send(error.message)
      })
  }
}

module.exports = Controller