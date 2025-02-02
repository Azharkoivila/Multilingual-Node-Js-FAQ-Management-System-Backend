const {Translator} = require('google-translate-api-x');
const dbfunctions=require("../helpers/db-function");

//FAQ Schema AND Transalation Functions

class FAQSchema{
    constructor(question,answer){
        this.question=question;
        this.answer=answer;
    }
    transalate(){
        const transferToHi=new Promise(async(resolve,reject)=>{
            const translator = new Translator({from: 'en', to: 'hi', forceBatch: false, tld: 'es'});
            const response = await translator.translate([this.question, this.answer]);
            if(response[0].text && response[1].text){
                dbfunctions.SaveFAQHi({question:response[0].text,answer:response[1].text}).then((response)=>{
                    if(response.acknowledged){
                        resolve("Hindi Transalation Compleated and SavedTO DB");
                    }else{
                        reject("FAQ DB insert Failed")
                    }
                })
            }else{
                reject("Hindi Transalation Failed"+response)
            }

        })
        const transferToBn=new Promise(async(resolve,reject)=>{
            const translator = new Translator({from: 'en', to: 'bn', forceBatch: false, tld: 'es'});
            const response = await translator.translate([this.question, this.answer]);
            if(response[0].text && response[1].text){
                dbfunctions.SaveFAQBn({question:response[0].text,answer:response[1].text}).then((response)=>{
                    if(response.acknowledged){
                        resolve("Bengali Transalation Compleated and SavedTO DB");
                    }else{
                        reject("FAQ DB insert Failed")
                    }
                    
                })
                
            }else{
                reject("Bengali Transalation Failed"+response);
            }
        })
        
        return Promise.all([transferToHi,transferToBn]);
    }
 
  }

  module.exports=FAQSchema;