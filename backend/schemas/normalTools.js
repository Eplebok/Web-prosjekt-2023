const mongoose = require('mongoose');

const normalToolSchema = new mongoose.Schema({
    name: String,
    description: String,
    size: String
  });
  
module.exports = mongoose.model('NormalTool', normalToolSchema);