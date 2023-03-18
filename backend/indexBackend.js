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

    app.use('/tools', require('./routes/toolroutes'))

    

   // app.use('/normal', require('./routes/toolroutes'))

   


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})






// FOR login insertion - kan mulig ryddes senere
const User = require("./schemas/userSchema")
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/home", (req, res)=>{
    res.render("login")
})

app.post("/api/user", (req, res)=>{
    const SaveUser = new User(req.body)
    SaveUser.save()
    res.send(SaveUser)
    res.render(SaveUser)
    console.log("sucess")
})