const FAQSchema =require("../helpers/FaqSchema");
const dbfunctions=require("../helpers/db-function");
var express = require('express');
var router = express.Router();




//create FAQ
router.post('/create',function(req, res, next) {
  const {question,answer}=req.body;
  if(question && answer){
    let faq=new FAQSchema(question,answer);
  Promise.allSettled([dbfunctions.saveFAQ(faq),faq.transalate()]).then((e)=>{
    res.send(e);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  });
  }else{
    res.statusMessage = "Qustion and Answer Must Needed On Body";
    res.status(400).end();
  }
});


module.exports = router;
