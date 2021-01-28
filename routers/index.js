const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const mid = (req, res, next) => {
  if (req.session.userId) {
    next()
  } else {
    res.redirect('/login');
  }
}

router.get('/', controller.home)
router.get('/register', controller.registerGet)
router.post('/register', controller.registerPost)
router.get('/login', controller.loginGet)
router.post('/login', controller.loginPost)
router.use(mid)
router.get('/admin', controller.adminPage)
router.get('/logout', controller.logout)
router.get('/:username', controller.userHome)
router.get('/musicPlayer/:embedUrl', controller.musicPlayer)
router.post('/musicPlayer', controller.search)
router.get('/:songId/addFavoritSong', controller.addFavoritSong)
router.get('/addNewSong', controller.addNewSong)
router.get('/addNewAlbum', controller.addNewAlbum)
// router.get('/:albumId/addFavoritAlbum', controller.addFavoritAlbum)

module.exports = router