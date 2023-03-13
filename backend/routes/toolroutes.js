const express = require("express")
const router = express.Router()

const {createTool} = require("../controllers/toolsController")
const {createUser} = require("../controllers/userController")

// this creates a new tool
router.post("/create/tool", createTool)
router.post("/create/user", createUser)

module.exports = router