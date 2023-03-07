const express = require("express")
const router = express.Router()

const {createTool} = require("../controllers/toolsController")

// this creates a new tool
router.post("/create/tool", createTool)

module.exports = router