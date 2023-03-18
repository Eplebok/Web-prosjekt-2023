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

app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    const tempPath = req.file.path;
    const targetDir = path.join(__dirname, "DBpictures");
    const targetPath = path.join(targetDir, req.file.originalname.replace(/\.[^/.]+$/, "") + path.extname(req.file.originalname));

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

app.post(
  "/register",
  async (req, res) => {
    try {
      const user = new userSchema({
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      res.status(200).end("User created!");
      console.log(user)
    } catch (err) {
      console.error(err);
      res.status(500).end("Oops! Something went wrong!");
    }
  }
);

// we import our routers
    app.use("api/tools", require("./routes/toolroutes"))

    app.use('/tools', require('./routes/toolroutes'))

   // app.use('/normal', require('./routes/toolroutes'))

   


// we set our server to listen to PORT
app.listen(PORT,() => {
    console.log(`Api fungere på ${PORT}`)
    console.log(process.env.MONGO_URI);
})




