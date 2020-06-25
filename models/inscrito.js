var mongoose = require('mongoose');

const inscritoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: Number,
    event: String
  });
  
  module.exports = mongoose.model('Inscrito', inscritoSchema);
