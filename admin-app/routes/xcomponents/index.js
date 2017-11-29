var express = require('express');
var router = express.Router();
var Xcomponents = require('../../models/xcomponents');
//Get Xcomponents record
router.get('/', function(req, res, next) {
  res.render('index', { title: 'List of Xaps and Components' });
});

router.read = function(req, res, next){
  Xcomponents.find().exec(function(err,data){
    if(err){ res.send('Error');}
    else{ res.json(data);}
  });
  return next();
}
// Create new Xcomponent
router.create = function(req, res, next){
  var xcomponent = new Xcomponents();
  xcomponent.uuid = req.params.xcomponents;
  xcomponent.is_active = req.params.is_active;    

  xcomponent.save(function(err, data){
    if(err){console.log("Error saving to db."+ err); }
    else{ res.json({status: "Success", id: data._id}); }
  });
  return next();
}
// Update Xcomponents

router.update = function(req, res, next){
  var arg = req.params.arg1;
  var query = { xcomponents: arg };

  Xcomponents.update( query, {xcomponents: true}, function(err, doc){
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
