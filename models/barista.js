var mongoose = require('mongoose');

const baristaSchema = new mongoose.Schema({
    name: String,
    title: String,
    imageUrl: String,
    calendarLink: String,
  });
  
  module.exports = mongoose.model('Barista', baristaSchema);
