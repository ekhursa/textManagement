var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  text_id: String,
  text: String,
});

mongoose.model('Text', TextSchema);