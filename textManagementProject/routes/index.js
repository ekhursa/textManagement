var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require("mongoose");
var Text = mongoose.model("Text");

router.get("/texts", function(req, res, next) {
	Text.find(function(err, texts){
		if(err) { return next(err); }
		
		res.json(texts);
	});
});

router.post("/texts", function(req, res, next) {
  var text = new Text(req.body);

  text.save(function(err, text){
    if(err){ return next(err); }

    res.json(text);
  });
});

router.get('/texts/:text', function(req, res) {
  res.json(req.text);
});

router.param('text', function(req, res, next, id) {
  var query = Text.findById(id);

  query.exec(function (err, text){
    if (err) { return next(err); }
    if (!text) { return next(new Error('can\'t find text')); }

    req.text = text;
    return next();
  });
});
