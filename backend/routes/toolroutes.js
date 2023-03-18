const express = require("express")
const router = express.Router()
const cors = require('cors');

const {createTool, getNormalTools, getElectricTools, getOneNormalTool, getOneElectricTool} = require("../controllers/toolsController")


router.get("/electric", cors(), getElectricTools)
router.get("/electric/:name", cors(), getOneElectricTool)
// Route for retrieving normal tools
router.get("/normal", cors(), getNormalTools)
router.get("/normal/:id", cors(), getOneNormalTool)

const {createUser, getAllUsers, getUser} = require("../controllers/userController")


// this creates a new tool
router.post("/create/tool", createTool)

// for user
router.post("/create/user", createUser)
router.get("/showall/user", getAllUsers)
router.get("/showone/user/:userName", getUser)



module.exports = router