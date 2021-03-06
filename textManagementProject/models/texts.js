var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  text: String,
  user: String,
  city: String,
  date: { type: Date, default: Date.now },
  parentId: String,
  children: []
},{
	versionKey: false
});

mongoose.model('Text', TextSchema);