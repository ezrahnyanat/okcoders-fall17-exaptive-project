var express = require('express');
var router = express.Router();

var static = require('../../models/static');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'staticduction' });
});
//Get static record
router.read = function(req, res, next){
	static.find().exec(function(err,data){
		if(err){ res.send('Error');}
		else{ res.json(data);}
	});
	return next();
}
// Create new static
router.create = function(req, res, next){
	var static = new static();
	static.static = req.params.static;
	static.date = new Date();

	static.save(function(err, data){
		if(err){console.log("Error saving to db."+ err); }
		else{ res.json({status: "Success", id: data._id}); }
	});
	return next();
}

module.exports = router;