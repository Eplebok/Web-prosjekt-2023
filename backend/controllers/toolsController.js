const toolSchema = require("../schemas/toolsSchema")
const ElectricTool = require('../schemas/electricTools')
const NormalTool = require('../schemas/normalTools')
// const multer = require("multer") // set up multer so we can upload image to the DB


// Get (read)
//Function to read info from database

// Retrieve electric tools from the 'electricTools' collection
const getTools = async (req, res) => {
    try {
      const allTools = await toolSchema.find();
      res.json(allTools)
     //res.render('electricTools', { tools: electricTools });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving electric tools');
    }
  }
  
  const getNormalTools = async (req, res) => {
    try {
      const normalTools = await NormalTool.find();
      res.json(normalTools)
      //res.render('normalTools', { tools: normalTools });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving normal tools');
    }
  }

  const getOneElectricTool = async (req, res) => {
    try{
      const name = req.params.name;
      const tool = await toolSchema.findOne({ name: name });
      res.json(tool);

    } catch (err) {
      console.error(err);
      res.status(404).send('Item not found');

    }
  }

  const getOneNormalTool = async (req, res) => {
    try{
      const name = req.params.name;
      const tool = await NormalTool.findOne({ name: name });
      res.json(tool);
    } catch (err) {
      console.error(err);
      res.status(404).send('Item not found');
    }
  }

// POST method (create)
// this function adds data in my DB
const createTool = async (req, res) => {
    try {
        const { name, image } = req.body;
        const user = new toolSchema({ name, image });

        await user.save();
        res.json({ message: 'success', data: user });
        console.log(`A new tool has been created, `, req.body ) // outputs the content of the user to the console

    } catch (err) {
        res.status(500).json({ message: 'error', error: err });
    }
};



module.exports = {createTool, getTools, getNormalTools, getOneElectricTool, getOneNormalTool}