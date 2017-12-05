var express = require('express');
var router = express.Router();
var axios = require('axios');

var Xcomponents = require('../../models/xcomponents');
const BaseUrl = "https://api.myjson.com/bins/101m6b";
//Get all the Xcomponents records
router.fetch = function(req, res, next){
  // get from api
  console.log("I am in fetch.");
  // remove all
  Xcomponents.remove({}).exec(function(err, data){
    if(err){
      console.log("Error deleting", err);
      res.send(err);
    }
    else{
    axios
      .get(BaseUrl)
      .then(successAjaxHandler)
      .then(data => res.json(data)) // handle sending the data back here.
      .catch(err);
    }
  });
}
successAjaxHandler = function(res){
  console.log("Ajax req is success.");
  const transformedData = res.data.map(function(obj){
    console.log(obj);
    if(!obj) return;
    if(!isEmpty(obj.UUID)){
      var xcomponent = new Xcomponents();
      xcomponent.uuid = obj.UUID;
      xcomponent.name = obj.Name;
      xcomponent.status = obj.Status;
      xcomponent.category = obj.Category;
      xcomponent.package = obj.Package;
      xcomponent.is_active = true;    

      xcomponent.save(function(err, data){
        if(err){console.log("Error saving to db."+ err); }
        else{ return({status: "Success", id: data._id}); }
      });
      return;      
    }
    else
      return;
  });
  return Promise.all(transformedData);
}

// Fetch from the API


router.read = function(req, res, next){
  Xcomponents.find().exec(function(err,data){
    if(err){ console.log(err);}
    else{       
      if(data && !isEmpty(data))
      res.json(data);
    }
  });
  return// next();
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
// Create new Xcomponent
router.create = function(req, res, next){
if(req.body.uuid)
  var xcomponent = new Xcomponents();
  xcomponent.uuid = req.body.uuid;
  xcomponent.name = req.body.name;
  xcomponent.status = req.body.status;
  xcomponent.category = req.body.category;
  xcomponent.package = req.body.package;
  xcomponent.is_active = true;    

  xcomponent.save(function(err, data){
    if(err){console.log("Error saving to db."+ err); }
    else{ res.json({status: "Success", id: data._id}); }
  });
  return //next();
}
// Update Xcomponents

router.edit = function(req, res, next){
  console.log("I am in the edit mode.");
  console.log(req.params);
  var is_active = req.params.is_active;
  Xcomponents.findById(req.params.xcomponent_id, function(err, xcomponent) {
    if (err){
      console.log("Error found.");
      res.send(err);
      return;
    }
        
    xcomponent.is_active = is_active;  // update the title
    console.log("xcomponent is");
    console.log(xcomponent);

    // save the bear
    xcomponent.save(function(err) {
      if (err)
          res.send(err);
      console.log("Component is updated!");
    });
  });
  res.send("Edit complete.");
  return //next();
}
module.exports = router;
