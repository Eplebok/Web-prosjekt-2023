const express = require("express")
const router = express.Router()
const cors = require('cors');

const {createTool, getNormalTools, getTools, getOneNormalTool, getOneElectricTool} = require("../controllers/toolsController")


router.get("/tools", cors(), getTools)
router.get("/electric/:name", cors(), getOneElectricTool)

router.get("/electric", cors(), getTools)
router.get("/electric/:name", cors(), getOneElectricTool)
// Route for retrieving normal tools
router.get("/normal", cors(), getNormalTools)
router.get("/normal/:name", cors(), getOneNormalTool)

const {createUser} = require("../controllers/userController")


// this creates a new tool
router.post("/create/tool", createTool)
router.post("/create/user", createUser)

module.exports = router