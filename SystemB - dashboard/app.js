const express = require('express')
const app = express()
const port = 3000
const Redis = require('ioredis')
const redisDB = new Redis("redis://:f4d4869850bc41c4bbf5ce7441fb8589@eu1-mighty-krill-38587.upstash.io:38587");
const bigml = require("./BIGML3")


app.set('view engine', 'ejs')

app.use(express.static('public'))
let x = new Array(5);
  

let taste = 1;
let branch = 1;
let datesResult = Array(12);
app.get('/dashboard', async (req, res) => {
  for(let i = 0; i < x.length; i++){
    x[i]=0;
  }
    if(req?.query){
      taste = req.query.taste;
      branch = req.query.branch;

    }
    var curStock = await getRedisData(taste,branch);
    var mascots = {mascots:[
        { name: 'שוקולד', stock: x[0]},
        { name: 'וניל', stock: x[1]},
        { name: 'תות', stock: x[2]},
        { name: 'לימון', stock: x[3]},
        { name: 'חלבה', stock: x[4]},
        { s: curStock},
        {results: datesResult}
      ]};
      for(let i = 1; i <=12; i++){
        datesResult[i-1] =  bigml.predictWeight(branch,taste,i)
      }
  res.render("pages/index",mascots)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



function getRedisData(taste,branch){
  return new Promise((resolve) =>
    redisDB.get("Stocks",(err,reply) => {
      if(err) throw err;
      let content = JSON.parse(reply);
      let selected = undefined;
      for(let item of content){
        x[item.FlavorID-1] += Number(item.Amount);
          if((item.BranchID == branch) && item.FlavorID == taste){
              resolve(item.Amount);
          }
      }
      if(selected == undefined){
          resolve(-1);
      }
    }) 
  )
}

function test(){
  return 10000;
}
module.exports = { test };
