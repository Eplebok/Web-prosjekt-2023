const express = require("express")
const app = express()
const PORT = process.env.PORT || 3200
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const connectDB = require("./dbconnect/dbconnect")
connectDB()

// we import our routers
    app.use("api/tools", require("./routes/toolroutes"))


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})