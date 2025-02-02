const dbfunctions=require("../helpers/db-function");
var express = require('express');
var router = express.Router();

// api root
router.post('/', function(req, res, next) {
  res.send("hello from api")
});

//fetch api
router.post('/faqs', function(req, res, next) {
  let language=req.query.lang;
  if(!language){
    res.send("specify language")
  }else{
    dbfunctions.getFaqs(language).then((response)=>{
      res.send(response)
    }).catch((err)=>{
      res.send(err)
    })
  }
 
  
});


module.exports = router;
