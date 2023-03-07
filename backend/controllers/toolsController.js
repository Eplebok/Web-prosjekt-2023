const toolSchema = require("../schemas/toolsSchema")
// const multer = require("multer") // set up multer so we can upload image to the DB


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

module.exports = {createTool}