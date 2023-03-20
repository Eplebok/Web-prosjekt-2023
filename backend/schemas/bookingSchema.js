// we import mongoose
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    startBookingDate: {
      type: String,
      required: true,
      unique: true,
    },
    endBookingDate: {
      type: String,
      required: true,
    }
  });

// export 
    module.exports = mongoose.model("bookingSchema", bookingSchema)