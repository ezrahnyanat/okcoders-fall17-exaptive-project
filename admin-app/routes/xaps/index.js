var express = require('express');
var router = express.Router();
var Xaps = require('../../models/xaps');


//Get Xaps record
router.get('/', function(req, res, next) {
  res.render('index', { title: 'List of Xaps' });
});

router.read = function(req, res, next){
  Xaps.find().exec(function(err,data){
    if(err){ res.send('Error');}
    else{ res.json(data);}
  });
  return next();
}
// Create a new Xap
router.create = function(req, res, next){
  var xap = new Xaps();
  xap.uuid = req.params.uuid;
  xap.is_active = req.params.is_active;    

  xaps.save(function(err, data){
    if(err){console.log("Error saving to db."+ err); }
    else{ res.json({status: "Success", id: data._id}); }
  });
  return next();
}
// Update Xaps

router.update = function(req, res, next){
  var arg = req.params.arg1;``
  var query = { xaps: arg };

  Xaps.update( query, {uuid: true}, function(err, doc){
    if(err){ 
      console.log("Unable to update document" + err ); 
      res.send(404);
    } else {
      res.json( {status: "success"} );
    }
    return next();
  });
}
module.exports = router;
