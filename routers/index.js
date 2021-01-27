const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.home)
router.get('/login', controller.loginGet())
router.post('/login', controller.loginPost())
router.get('/register', controller.registerGet())
router.post('/register', controller.registerPost())
router.get('/:username', controller.userHome())
router.get('/:id/addFavoritSong', controller.addFavoritSong())
router.get('/:id/addFavoritAlbum', controller.addFavoritAlbum())
router.get('/admin', controller.adminPage())
router.get('/logout', controller.logout())

module.exports = router