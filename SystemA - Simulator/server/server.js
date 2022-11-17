


import pkg from 'mssql';
import cors from 'cors';
import express from 'express';

import { Kafka } from 'kafkajs'
const app = express()
const { connect, Request } = pkg;

const kafka = new Kafka({
    brokers: ['saving-iguana-10320-eu1-kafka.upstash.io:9092'],
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'c2F2aW5nLWlndWFuYS0xMDMyMCTEMTu8UgKx4c-Lzoz64BPipWN3vJAWlSpwm_E',
        password: 'qz0Xiu3Q7HIwMu17dSg99krhoA5oAxiDQz50ugoBfsVi1OXVg1KKAlZ2nifT1SJnPYDu7A==',
    },
    ssl: true,
})

const producer = kafka.producer()
producer.connect()




app.use(cors())

app.listen(5000, () => { console.log("Server on port http://localhost:5000") })


app.get('/simulator', function (req, res) {

    var config = {
        server:
            "bigdataprojects.database.windows.net",
        authentication: {
            type: "default",
            options: {
                userName: "bigdata",
                password: "mulan2000!",
            },
        },
        options: {
            encrypt: true,
            database: "BigDataProject",
        },
    };

    connect(config, function (err) {

        if (err) {
            console.log(err);
        }
        var request = new Request();
        request.query('select * from Branches', function (err, recordset) {

            if (err) { console.log(err); }
            else {
                var total = count(recordset['recordsets'][0]);
                var cities = [];
                var BranchesId = []
                var flavor = ['chocolate', 'vanilla', 'strawberrie', 'lemon', 'halva']
                var weights = [0.25, 0.5, 1, 1.5, 2]
                var start_date = new Date("2022-10-02")
                var end_date = new Date("2022-10-02")
                for (var i = 0; i < 100; i++) {
                    BranchesId.push(recordset['recordsets'][0][i]['BranchID'])
                    if (cities.includes(recordset['recordsets'][0][i]['Town']) == false) {
                        cities.push(recordset['recordsets'][0][i]['Town']);
                    }
                }
                let counter = 1;
                while (start_date <= end_date) {
                    BranchesId.forEach(bid => {
                        if (bid <= 100) {
                            var num_of_sales_of_chocolate = randomsales(5, 20)
                            var num_of_sales_of_vanilla = randomsales(2, 12)
                            var num_of_sales_of_strawberrie = randomsales(3, 8)
                            var num_of_sales_of_lemon = randomsales(5, 7)
                            var num_of_sales_of_halva = randomsales(0, 4)

                            var sales_of_flavores = []
                            sales_of_flavores[0] = num_of_sales_of_chocolate
                            sales_of_flavores[1] = num_of_sales_of_vanilla
                            sales_of_flavores[2] = num_of_sales_of_strawberrie
                            sales_of_flavores[3] = num_of_sales_of_lemon
                            sales_of_flavores[4] = num_of_sales_of_halva

                            for (var j = 0; j < sales_of_flavores.length; j++) {
                                for (var i = 0; i < sales_of_flavores[j]; i++) {
                                    var weight_of_sale = weights[randomnum(0, weights.length - 1)]
                                    
                                    try{
                                        console.log(counter++ + ": " + bid +", " + start_date.toDateString() + ", " +  (j + 1) + ", " + weight_of_sale)
                                        send_to_kafka(bid, start_date, j + 1, weight_of_sale)
                                    }
                                    catch{
                                        console.log("ERROR")
                                        return;
                                    }
                                }
                            };

                        }
                    })

                    start_date.setDate(start_date.getDate() + 1)
                }

            };
        });
    });
    res.send("simulator end")
});

function randomsales(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function send_to_kafka(bid, date, flavore, weight) {
    var info = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "," + bid + "," + flavore + "," + weight
    producer.send({
        topic: "kafki",//"SalesIcecream",
        messages: [
            { value: info }
        ]
    })
}

function count(array) {
    var c = 0;
    for (var i in array) // in returns key, not object
        if (array[i] != undefined)
            c++;
    return c;
}

producer.disconnect()



