// const { Album, FavoritSong, Song, User } = require('../models')
// const { encryptionPwd, checkPwd } = require('../helper/bcrypt')
// const axios = require('axios');
// const CircularJSON = require('circular-json')

// class Controller {
//   static home(req, res) {
//     res.render('home')
//   }
//   static loginGet(req, res) {
//     res.render('login')
//   }
//   static loginPost(req, res) {
//     let input = req.body;
//     User.findAll({
//       where: {
//         username: input.username
//       }
//     })
//       .then(data => {
//         let password = checkPwd(input.password, data[0].password)
//         if (password && data.length !== 0) {
//           req.session.userId = data[0].id
//           req.session.username = data[0].username
//           if (data[0].role === 'admin') {
//             res.redirect('/addNewSong')
//           } else {
//             res.redirect(`/${req.session.username}`)
//           }
//         } else {
//           res.redirect('/login')
//         }
//       })
//       .catch(err => {
//         res.send(err)
//       })
//   }
//   static registerGet(req, res) {
//     res.render('register')
//   }
//   static registerPost(req, res) {
//     let data = req.body
//     console.log(data);
//     data.password = encryptionPwd(data.password)
//     User.create(data)
//       .then(data => {
//         res.redirect('/login')
//       })
//       .catch(err => {
//         res.send(err.message)
//       })
//   }
//   static userHome(req, res) {
//     let username = req.params.username

//     Song.findAll({
//       include: {
//         model: User
//       }
//     })
//       .then(data => {
//         res.render('userHome', { username, data })
//       })
//   }
//   static musicPlayer(req, res) {
//     let username = req.session.username
//     axios.get(`https://api.deezer.com/track/${req.params.embedUrl}`)
//       .then(data => {
//         let json = CircularJSON.stringify(data.data);
//         let temp = JSON.parse(json)
//         res.render('musicPlayer', { temp, username })
//       })
//       .catch(function (error) {
//         res.send(error.message)
//       })
//   }
//   static addFavoritSong(req, res) {
//     let data = {
//       UserId: req.session.userId,
//       SongId: req.params.songId
//     }

//     FavoritSong.create(data)
//       .then(() => {
//         res.redirect(`/${req.session.username}`)
//       })
//       .catch(err => {
//         res.send(err.message)
//       })
//   }
//   static logout(req, res) {
//     req.session.destroy((err) => {
//       res.redirect('/login')
//     })
//   }
//   static adminPage(req, res) { //< ane edit ini
//     Song.findAll({
//       include : {
//         model : Album
//       }
//     })
//     .then(data => {
//       res.render('adminPage', {data})
//     })
//     .catch(err => {
//       res.send(err.message)
//     })
//   }
//   static addNewSongGet(req, res) {
//     res.render('addSongPage')
//   }
//   static addNewSongPost(req, res) {
//     let { title, albumName } = req.body
//     let tempEmbed
//     axios.get(`https://api.deezer.com/search/track?q=${title}`)
//       .then(data => {
//         let json = CircularJSON.stringify(data.data.data);
//         let temp = JSON.parse(json)
//         tempEmbed = String(temp[0].id)
//         return Song.create({
//           title: title,
//           AlbumId: 1,
//           embed_url: tempEmbed
//         })
//       })
//       .then(data => {
//         res.redirect('/addNewSong')
//       })
//       .catch(err => {
//         res.send(err.message)
//       })

//   }
//   static search(req, res) {
//     let search = req.body.search
//     axios.get(`https://api.deezer.com/search?q=${search}`)
//       .then(data => {
//         let json = CircularJSON.stringify(data.data.data[0]);
//         let temp = JSON.parse(json)
//         let username = req.session.username
//         res.render('musicPlayer', { temp, username })
//       })
//       .catch(function (error) {
//         res.send(error.message)
//       })
//   }
// }

// module.exports = Controller
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
    let username = req.session.username
    axios.get(`https://api.deezer.com/track/${req.params.embedUrl}`)
      .then(data => {
        let json = CircularJSON.stringify(data.data);
        let temp = JSON.parse(json)
        res.render('musicPlayer', { temp, username })
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
  //------------------------------------------------- modified
  static adminPage(req, res) { //< ane edit ini
    Song.findAll({
      include: {
        model: Album
      }
    })
      .then(data => {
        res.render('adminPage', { data })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  //------------------------------------------------- modified
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

  //------------------------------------------------- modified
  static postNewSong(req, res) {
    let search = req.body.search
    let dataSong = {};
    let dataAlbum = {};
    axios.get(`https://api.deezer.com/search?q=${search}`)
      .then(data => {
        let json = CircularJSON.stringify(data.data.data[0]);
        let temp = JSON.parse(json)
        console.log(temp)
        dataSong.title = temp.title
        dataSong.embed_url = temp.link
        dataAlbum.album_name = temp.album.title
        dataAlbum.band_name = temp.artist.name
        // console.log(dataSong, 'ini datasong')
        // console.log(dataAlbum, 'ini data album')
        return Album.create(dataAlbum)
      })
      .then(data => {
        return Album.findOne({
          where: {
            album_name: dataAlbum.album_name
          }
        })
      })
      .then(data => {
        dataSong.AlbumId = data.id
        return Song.create(dataSong)
      })
      .then(data => {
        res.redirect('/admin')
      })
      .catch(function (error) {
        res.send(error.message)
      })
  }

  static deleteSongById(req, res) {
    let id = +req.params.id
    Song.destroy({
      where: {
        id: id
      }
    })
      .then(data => {
        res.redirect('/admin')
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  //------------------------------------------------- modified
}
/*
  song  : title , embed_url , AlbumId
  Album : album_name, band_name, released_year
*/
module.exports = Controller