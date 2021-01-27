const { Album, Playlist, Song, User } = require('../models')

class Controller {
  static home(req, res) {
    res.send('ini home')
  }
}

module.exports = Controller