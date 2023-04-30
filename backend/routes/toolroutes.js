const express = require("express")
const router = express.Router()
const cors = require('cors');
const multer = require('multer')
const {createTool, getNormalTools, getTools, getOneNormalTool, getOneElectricTool, uploadTool, configTool, deleteTool} = require("../controllers/toolsController")
const {createUser} = require("../controllers/userController")

const upload = multer({
    dest: "/DBpictures",
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .png, .jpeg and .jpg files are allowed!"), false);
      }
    },
  });


router.get("/tools", cors(), getTools)
router.get("/electric/:name", cors(), getOneElectricTool)

router.get("/electric", cors(), getTools)
router.get("/electric/:name", cors(), getOneElectricTool)
// Route for retrieving normal tools
router.get("/normal", cors(), getNormalTools)
router.get("/normal/:name", cors(), getOneNormalTool)

// this creates a new tool
router.post("/create/tool", createTool)
router.post("/create/user", createUser)

router.delete("/delete/:id", cors(), deleteTool)

router.put("/configure/:name", cors(), configTool)


router.post('/upload', upload.single("file"), uploadTool)

module.exports = router