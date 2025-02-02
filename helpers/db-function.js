require("dotenv").config();
const mongodb=require('../config/mongodb');

//Database Functions
module.exports={
saveFAQ(faq){
    return new Promise((resolve,reject)=>{
        mongodb.get().collection(process.env.DEFAULT_FAQS).insertOne(faq)
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
        mongodb.get().collection(process.env.BENGALI_FAQS).insertOne(Bn)
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
        mongodb.get().collection(process.env.HINDI_FAQS).insertOne(Hi)
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
        language = language == "en" ? "English" : language == "bn" ? "Bengali" : language== "hi"  ? "Hindi" : "English";
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
