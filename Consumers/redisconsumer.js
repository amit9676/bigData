import Redis from 'ioredis'
const redisDB = new Redis("redis://:f4d4869850bc41c4bbf5ce7441fb8589@eu1-mighty-krill-38587.upstash.io:38587");
//const redisDB = new Redis(); local server - use in case of emegercy
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  brokers: ['saving-iguana-10320-eu1-kafka.upstash.io:9092'],
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'c2F2aW5nLWlndWFuYS0xMDMyMCTEMTu8UgKx4c-Lzoz64BPipWN3vJAWlSpwm_E',
      password: 'qz0Xiu3Q7HIwMu17dSg99krhoA5oAxiDQz50ugoBfsVi1OXVg1KKAlZ2nifT1SJnPYDu7A==',
  },
  ssl: true,
})

const consumer = kafka.consumer({ groupId: 'u16' })
consumer.connect()
await consumer.subscribe({ topic: 'kafki',fromBeginning: true })// SalesIcecream
consumer.run({
    eachMessage: async ({ topic, partition, message}) => {
      const mysales = message.value.toString().split(",")
      
      //redis section
      await redisDB.get("Stocks",async (err,reply) => {
        if(err) throw err;
        console.log(mysales)
        let content = JSON.parse(reply);
        let selected = undefined;
        for(let item of content){
            if(item.BranchID == Number(mysales[1]) && item.FlavorID == Number(mysales[2])){ // bid , flavorid
                selected = item;
                break;
            }
        }

        let newAmount = selected.Amount - Number(mysales[3]); // weight
        if(newAmount <= 0){
            newAmount = 100;
            //refill
        }
        selected.Amount = newAmount;
        await redisDB.set("Stocks",JSON.stringify(content),(err,reply) => {
            
            if(err) throw err;
            console.log("operation sucsceeded")
        })
      })
    },
})
