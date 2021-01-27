const { Album, Playlist, Song, User } = require('../models')
const { compare } = require('../helper/bcrypt')

class Controller {
  static home(req, res) {
    res.render('home');
  }

  static loginGet(req, res){
    let failMsg = {
      pesan : ''
    }
    res.render('login', {failMsg});
  }

  static loginPost(req, res){
    let { username, password } = req.body
    User.findOne({
      where : {
        username : username
      }
    })
    .then(data => {
      let pass = compare(password, data.password);
      let failMsg = {
        pesan : 'Invalid Username / Password'
      }
      if(data && pass){
        req.session.userId = data.id
        req.session.username = data.username
        failMsg.pesan = '';
        res.send('a')
      } else{
        res.render('login', {failMsg});
      }
    })
    .catch(err => {
      res.send(err.message)
    })
  }

  static registerGet(req, res){
    res.render('registerpage');
  }

  static registerPost(req, res){
    let newData = {
        full_name : req.body.full_name,
        username : req.body.username,
        email : req.body.email, 
        no_telp : req.body.no_telp,
        password : req.body.password,
    }
    User.create(newData)
    .then(data => {
      res.redirect('/login');
    })
    .catch(err => {
      res.send(err.message);
    })
  }
}

module.exports = Controller