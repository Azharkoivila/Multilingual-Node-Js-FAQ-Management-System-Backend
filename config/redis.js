const redis = require('redis');
let redisClient;
let obj={
    redisConnection:null
}
const connection=async() => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  if(redisClient){
    obj.redisConnection=redisClient;
  }
}

module.exports.redisObj=()=>{
return obj.redisConnection;
};
module.exports.CreateConnection=connection;