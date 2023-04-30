const express = require('express');
const router = express.Router();
//const {check} = require('express-validator')
const {signup, login, decodeCookie, logout} = require('../controllers/userController')
//const { auth } = require('../controllers/verifyToken') // add this later on


router.post('/register', signup)

router.post('/login', login)

router.get('/decode', decodeCookie)

router.get('/logout', logout)

module.exports = router





