const User = require("../schemas/userSchema.js")

const createUser = async (req, res) => {

   await User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            console.log("already a user")
            return res.status(400).json({email: "already registered!"})
        } else {
            console.log("not a user")
            const newUser = new User ({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save();
            return res.status(200).json({msg: newUser})
        }
    });
};

const getAllUsers = async (req, res) => {
    try {
        const showUsers = await User.find()
        res.json(showUsers)
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const getUser = async (req, res) => {
    try {
        const showUser = await User.find({
            userName: req.params.userName
        })
        res.json(showUser)
    } catch (error) {
        res.json({
            message: error
        })
    }
}
module.exports = {createUser, getAllUsers, getUser}