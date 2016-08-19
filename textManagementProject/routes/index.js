var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title : 'Express'
	});
});

module.exports = router;

var mongoose = require("mongoose");
var Text = mongoose.model("Text");

router.get("/texts/forumView", function (req, res, next) {
	Text.find(function (err, texts) {
		if (err) {
			return next(err);
		}
		var sortedArray = [];
		for (var i = 0; i < texts.length; i++) {
			if (texts[i].parentId == null) {
				populateChildren(texts[i], texts);
				console.log(texts[i].children);
				sortedArray.push(texts[i]);
			}
		}

		res.json(sortedArray);

	});
});

router.get("/texts", function (req, res, next) {
	Text.find(function (err, texts) {
		if (err) {
			return next(err);
		}
		res.json(texts);

	});
});

var populateChildren = function (text, texts) {
	//text.children = new Array();
	for (var j = 0; j < texts.length; j++) { ;
		if (text._id == texts[j].parentId) {
			text.children.push(texts[j]);
		}
	}
	//console.log(text);

	for (var x = 0; x < text.children.length; x++)
		populateChildren(text.children[x], texts);
};

router.post("/texts", function (req, res, next) {
	var text = new Text(req.body);

	text.save(function (err, text) {
		if (err) {
			return next(err);
		}

		res.json(text);
	});
});

router.get('/texts/:text', function (req, res) {
	res.json(req.text);
});

router.param('text', function (req, res, next, id) {
	var query = Text.findById(id);

	query.exec(function (err, text) {
		if (err) {
			return next(err);
		}
		if (!text) {
			return next(new Error('can\'t find text'));
		}

		req.text = text;
		return next();
	});
});
