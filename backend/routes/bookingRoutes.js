const express = require("express")
const router = express.Router()
const {getBooking, uploadBooking} = require('../controllers/bookingController')

router.get('/getBooking', getBooking)

router.post('/uploadBooking', uploadBooking)


module.exports = router

