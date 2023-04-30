const express = require("express")
const app = express()
const PORT = process.env.PORT || 3200
require("dotenv").config()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const connectDB = require("./dbconnect/dbconnect")
connectDB()
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const jwt = require('jsonwebtoken'); // required for creating JSON Web Tokens
const secretKey = 'pass'; // replace this with a secret key of your choice
module.exports = jwt


 const bcrypt = require('bcrypt');

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.use(express.static("public"));
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));


// we import our routers

    app.use('/tools', require('./routes/toolroutes'))

    // route for signup/login 
    app.use('/', require('./routes/userRoutes'))

    // route for the different booking parts
    app.use('/booking', require('./routes/bookingRoutes'))


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})







