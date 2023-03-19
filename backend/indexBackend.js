const express = require("express")
const app = express()
const PORT = process.env.PORT || 3200
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const toolSchema = require("./schemas/toolsSchema")
const userSchema = require("./schemas/userSchema")
app.use(bodyParser.json())
const connectDB = require("./dbconnect/dbconnect")
connectDB()
const mime = require("mime");
const path = require("path");
const fs = require("fs");
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

const uploadDir = path.join(__dirname, "DBpictures");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// this code is for adding tools to the database in the tool.html page
  app.post(
    "/upload",
    upload.single("file"),
    async (req, res) => {
      const tempPath = req.file.path;
    const targetDir = path.join(__dirname, "DBpictures");
    const date = Date.now();
    const targetFileName = `${date}-${req.file.originalname}`;
    const targetPath = path.join(targetDir, targetFileName);

      try {
        await fs.promises.rename(tempPath, targetPath);
        const tool = new toolSchema({
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          electric: req.body.electric,
          image: targetPath
        });
        await tool.save();
        res.status(200).end("File uploaded!");
      } catch (err) {
        console.error(err);
        res.status(500).end("Oops! Something went wrong!");
      }
    }
  );

// this code is for the register part in the login.html page
app.post("/register", async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).end("Email already registered");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
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


app.post("/login", async (req, res) => {
  try {
    const user = await userSchema.findOne({
      email: req.body.email,
    });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      console.log(user);
      res.status(200).end(`Welcome ${user.email}`);

    } else {
      console.log("Invalid email or password");
      res.status(500).end("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).end("Oops! Something went wrong!");
  }
});







// we import our routers
    app.use("api/tools", require("./routes/toolroutes"))

    app.use('/tools', require('./routes/toolroutes'))

   // app.use('/normal', require('./routes/toolroutes'))

   


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})




