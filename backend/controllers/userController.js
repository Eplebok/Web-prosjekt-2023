const User = require("../schemas/userSchema.js")

const createUser = async (req, res) => {

   await User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            return res.status(400).json({email: "already registered!"})
        } else {
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

module.exports = {createUser}