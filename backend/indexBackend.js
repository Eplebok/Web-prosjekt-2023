const express = require("express")
const app = express()
const PORT = process.env.PORT || 3200
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const toolSchema = require("./schemas/toolsSchema")
const userSchema = require("./schemas/userSchema")
const bookingSchema = require("./schemas/bookingSchema")
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

const multer = require("multer");

const upload = multer({
  dest: "./DBpictures",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpeg and .jpg files are allowed!"), false);
    }
  }
});

const uploadDir = path.join("assets", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// this code is for adding tools to the database in the tool.html page
app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    const tempPath = req.file.path;
    const date = Date.now();
    const targetFileName = `${date}-${req.file.originalname}`;
    const targetPath = path.join(uploadDir, targetFileName).replace(/\\/g, "/");

    try {
      await fs.promises.rename(tempPath, targetPath);
      const tool = new toolSchema({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        electric: req.body.electric,
        image: targetPath,
      });
      await tool.save();
      res.status(200).end("File uploaded!");
    } catch (err) {
      console.error(err);
      res.status(500).end("Oops! Something went wrong!");
    }
  }
);



//this code is for the register part in the login.html page

app.post("/register", async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).end("Email already registered");
    } else {
      // Hash the password
     // const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new userSchema({
        email: req.body.email,
        password: hashedPassword, // Store the hashed password
      });
      await user.save();
      res.status(200).end("User created successfully!");
      console.log(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).end("Oops! Something went wrong!");
  }
});



// this code is for login part in the login.html page 
// used POST because its more secure and people recommended it on stack-overflow, even though we dont update anything



app.post("/uploadBooking", async (req, res) => {
    try {
      const existingUser = await userSchema.findOne({ email: req.body.email });
      if (!existingUser) {
        console.log("You have not entered a registered email adress");
        console.log(existingUser)
      } else {
    const startValiadation = await bookingSchema.findOne({startBookingDate: req.body.startBookingDate});
    const endValiadation = await bookingSchema.findOne({endBookingDate: req.body.endBookingDate})
    const d3 = req.body.startBookingDate;  
    const d4 = req.body.endBookingDate
    var day3 = new Date(d3);   
    var day4 = new Date(d4);
    console.log(d3 + " " + d4);    
    const diff = (day4.getTime() - day3.getTime()) / (1000*60*60*24)     
    console.log(diff + "days between");

    if (diff > 5) {
      console.log("You can only book a tool for maximimum 5 days")
      res.status(409).end("You can only book a tool for maximimum 5 days");
    }
    if (diff < 0) {
      console.log("You cannot book a negative number of days!")
      res.status(409).end("You cannot book a negative number of days!");
    }
    if (startValiadation) {
      res.status(409).end("start already booked");
      console.log("start alrdy booked")
    }
     else if (endValiadation) {
      res.status(409).end("end already booked");
      console.log("end alrdy booked")
    }
     else if (diff <= 5 && diff >= 0 && existingUser) {
      const Booking = new bookingSchema({
        email: req.body.email,
        startBookingDate: req.body.startBookingDate,
        endBookingDate: req.body.endBookingDate,
      });
      await Booking.save();
      res.status(200).end("Success!")
      console.log(Booking);
      
    }
  }
    }
   catch (err) {
    res.status(500).end("error");
   }
  })


    // used for the log in 
    // prevent the page from sending you to res.status(200).end(¨Welcome ${user.email}¨)
    app.post('/login', async (req, res) => {
      try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          console.log(user);           //need to change httpOnly to true(httpOnly:true) and then import jwt and decode it on the client side. better security
          const token = jwt.sign({ email: user.email, loggedIn: true }, secretKey, { expiresIn: '1h' }); // add loggedIn property to the token
          res.cookie('token', token, { httpOnly: false, maxAge: 3600000 }); // set a cookie with the token
          console.log('Cookie set:', res.get('Set-Cookie')); // log the Set-Cookie header
          res.redirect("/index.html")
        } else {
          console.log('Invalid email or password');
          res.status(500).end('Invalid email or password');
        } 
      } catch (err) {
        console.error(err);
        res.status(500).end('Oops! Something went wrong!');
      }
    });
    

app.get("/getBooking", async (req, res) => {
  try {
    const getBooking = await bookingSchema.find();
    res.json(getBooking)
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error ');
  }
});



// this code is for adding Booking to the database in the booking.html p







// we import our routers
    app.use("api/tools", require("./routes/toolroutes"))

    app.use('/tools', require('./routes/toolroutes'))

   // app.use('/normal', require('./routes/toolroutes'))

   


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})







