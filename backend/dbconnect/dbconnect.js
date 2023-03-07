const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    }
};

module.exports = connectDB;