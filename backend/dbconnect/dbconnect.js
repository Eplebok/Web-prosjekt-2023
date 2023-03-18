const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        //Alternativ link for meg(hallvard)
        const conn = await mongoose.connect("mongodb+srv://mathias:123@webprosjekt.hym7kgp.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true})

        //Dette er den riktig linken engentlig
        //const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    }
};

module.exports = connectDB;