var express = require('express');
var router = express.Router();
var Static = require('../../models/static');


//Get static record
router.read = function(req, res, next){
	Static.find().exec(function(err,data){
		if(err){ res.send('Error');}
		else{ 
			console.log("I am in read.");
			console.log(data);
			if(data && !isEmpty(data))
			res.json(data);
		}
	});
	return //next();
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

router.delete = function(req, res, next){
	console.log("I am in the delete mode.");
	Static.remove(req.params.static_id, function(err, static) {

            if (err)
                res.send(err);
            else
                res.json({ message: 'Static page is deleted!' });
            });

		return //next();
	};
// find a record by Id
router.get = function(req, res, next){
	if(!req.params.static_id){ 
		res.send('Could not get the id of the static page.'); 
		return next();
	}
	Static.findById(req.params.static_id).exec(function(err,data){
		if(err){ res.send('Could not find the id.');}
		else{ 
			console.log("I am in get.");
			console.log(data);
			if(data && !isEmpty(data))
				res.json(data);
		}
	});
	//return //next();	
}
// Edit records
router.edit = function(req, res, next){
	console.log("I am in the edit mode.");
	Static.findById(req.params.static_id, function(err, static) {

            if (err)
                res.send(err);
			console.log(req.body);
            static.title = req.body.title;  // update the title
            static.description = req.body.description;  // update the description
            static.date_modified = new Date();
            // save the bear
            static.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Static page is updated!' });
            });
        });
//	return next();
}
// Create new static
router.create = function(req, res, next){
	console.log("I am in create.");
	var static = new Static();
	static.title = req.body.title;
	static.description = req.body.description;	
	static.date_modified = new Date();
	console.log("Static object is:");
	console.log(static.title);
	console.log(static.description);
	console.log(static.date_modified);


	static.save(function(err, data){
		if(err){console.log("Error saving to db."+ err); }
		else{ res.json({status: "Success", id: data._id}); }
	});
	return // next();
}

module.exports = router;