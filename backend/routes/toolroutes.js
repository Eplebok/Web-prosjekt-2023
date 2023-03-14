const express = require("express")
const router = express.Router()

const {createTool} = require("../controllers/toolsController")

const {getElectricTools} = require('../controllers/toolsController');
const {getNormalTools} = require('../controllers/toolsController');

router.get('/electric', getElectricTools);

// Route for retrieving normal tools
router.get('/normal', getNormalTools);

const {createUser} = require("../controllers/userController")


// this creates a new tool
router.post("/create/tool", createTool)
router.post("/create/user", createUser)

module.exports = router