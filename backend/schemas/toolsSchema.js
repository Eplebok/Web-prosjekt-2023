// we import mongoose
const mongoose = require("mongoose")

const toolSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    electric: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String, // Store the path to the image file
      required: true
    }
  });
  

// export 
    module.exports = mongoose.model("toolSchema", toolSchema)