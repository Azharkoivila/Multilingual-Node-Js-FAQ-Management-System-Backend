const dbfunctions=require("../helpers/db-function");
const redis=require("../config/redis")
var express = require('express');
var router = express.Router();


// api root
router.post('/', function(req, res, next) {
  res.send("hello from api")
});

//fetch api
router.post('/faqs', async function(req, res, next) {
  let language=req.query.lang;
  if(!language){
    res.send("specify language")
  }else{
    const cached= await redis.redisObj().get(language);
    if(cached){
      res.send(JSON.parse(cached))
    }else{
      dbfunctions.getFaqs(language).then(async(response)=>{
        res.json(response);
        await redis.redisObj().set(language,JSON.stringify(response));
      }).catch((err)=>{
        res.send(err)
      })
    }
    }
});


module.exports = router;
