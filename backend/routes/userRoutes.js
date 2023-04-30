const express = require('express');
const router = express.Router();
//const {check} = require('express-validator')
const {signup, login} = require('../controllers/userController')
//const { auth } = require('../controllers/verifyToken') // add this later on


router.post('/register', signup)

router.post('/login', login)

module.exports = router





