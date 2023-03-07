// we import mongoose
const mongoose = require("mongoose")

const toolSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter the name of the tool"],
    },
    image: {
      data: Buffer, // Store the image data as a buffer object
      contentType: String, // Store the content type of the image (e.g. "image/png")
    },
  });

// export 
    module.exports = mongoose.model("toolSchema", toolSchema)