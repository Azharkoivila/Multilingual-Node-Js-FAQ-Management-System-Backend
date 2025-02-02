require("dotenv").config();
const mongodb=require('../config/mongodb');

//Database Functions
module.exports={
saveFAQ(faq){
    return new Promise((resolve,reject)=>{
        mongodb.get().collection("Default").insertOne(faq)
        .then((result) => {
            if(result.acknowledged){
                resolve(result);
            }else{
                reject("FAQ DB insert Failed")
            }
          
        });
    })
},
SaveFAQBn(Bn){
    return new Promise((resolve,reject)=>{
        mongodb.get().collection("Bangali").insertOne(Bn)
        .then((result) => {
            if(result.acknowledged){
                resolve(result);
            }else{
                reject("FAQ DB insert Failed")
            }
        });
    }) 
},
SaveFAQHi(Hi){
    return new Promise((resolve,reject)=>{
        mongodb.get().collection("Hindi").insertOne(Hi)
        .then((result) => {
            if(result.acknowledged){
                resolve(result);
            }else{
                reject("FAQ DB insert Failed")
            }
        });
    }) 
},
getFaqs(language){
    return new Promise(async(resolve,reject)=>{
        language = language == "en" ? "Default" : language =="bn" ?  "Bangali" : language== "hi"  ? "Hindi" : "Default";
        let FAQS = await mongodb.get()
        .collection(language)
        .find()
        .toArray();
        if(FAQS){
            resolve(FAQS);
        }else{
            reject("No FAQS Available")
        }
      
    });
}

}
