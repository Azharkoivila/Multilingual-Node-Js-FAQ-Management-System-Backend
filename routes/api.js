const dbfunctions=require("../helpers/db-function");
const redis=require("../config/redis")
var express = require('express');
const { languages } = require("google-translate-api-x");
var router = express.Router();

// api root
router.get('/', function(req, res, next) {
  res.send("hello from api")
});




//fetch api
router.get('/faqs', async function (req, res) {
  
  try {
    let language = req.query.lang || "Default"; 
    const redisClient = redis.redisObj();

   
    const cachedData = await redisClient.get(language);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

  
    const faqs = await dbfunctions.getFaqs(language);
    if (faqs.length > 0) {
      await redisClient.set(language, JSON.stringify(faqs)); 
      return res.json(faqs);
    }

    
    return res.status(404).json({ message: "No FAQ FOUND" });

  } catch (err) {
    console.error("Error fetching FAQs:", err);
    return res.status(500).json({ error: "Error", details: err.message });
  }
});



module.exports = router;
