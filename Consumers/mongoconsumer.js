
import { Kafka } from 'kafkajs'
import pkg from 'mssql'
import axios from 'axios'
import { MongoClient } from 'mongodb'




//var mongourl = "mongodb+srv://robinhood:robinhood@weatherdb.mnft4bp.mongodb.net/?retryWrites=true&w=majority";
var mongourl = "mongodb+srv://robinhood:robinhood@weatherdb.mnft4bp.mongodb.net/test"
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

function bid_town_sql() {
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
        request.query('select BranchID, Town from Branches', function (err, recordset) {
            bid_town = recordset['recordset']
        })
    })
}
var bid_town

bid_town_sql()


const consumer = kafka.consumer({ groupId: 'mongo18' })
consumer.connect()
await consumer.subscribe({ topic: 'kafki', fromBeginning: true })// SalesIcecream
consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        
        const mysales = message.value.toString().split(",")
        let d = new Date(mysales[0])
        mysales[0] = d.getFullYear().toString() + "-" + d.toLocaleString("default", { month: "2-digit" }) + "-" + d.toLocaleString("default", { day: "2-digit" });
        let city = bid_town[parseInt(mysales[1]) - 1]['Town']
        
        let weather = await getCityRecieveWeather(city)
        let holiday = await getHoloday(mysales[0]) // data
        let demog = await getDemography(city)
        console.log(mysales[1], bid_town[parseInt(mysales[1]) - 1]['BranchID'], weather,holiday.toString(),demog)
        mongoInsert(mysales[1], bid_town[parseInt(mysales[1]) - 1]['BranchID'], weather,holiday.toString(),demog)
    }
})










function mongoInsert(SaleID, DateInput, weather, holiday, demographic) {

    MongoClient.connect(mongourl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SalesDetails");
        var myobj = { Sale: SaleID, Date: new Date(DateInput), Weather: weather, Holiday: holiday, Demographic: demographic };
        dbo.collection("Sales2").insertOne(myobj, function (err, result) {
            
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

function mongoRecieve() {
    MongoClient.connect(mongourl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SalesDetails");
        dbo.collection("Sales").find({}).toArray(function (err, result) {
            if (err) throw err;
            //res.json(result)
            db.close();
        });
    });
}


//weather section
async function getCityRecieveWeather(cityName) {
    return new Promise((resolve,reject) =>
        axios.get("https://boardsgenerator.cbs.gov.il/Handlers/WebParts/YishuvimHandler.ashx?dataMode=Yeshuv&filters=%7B%22Years%22:2021%7D&filtersearch=" + cityName + "&language=Hebrew&mode=GridData&subject=BaseData")
            .then(async function (response) {
                let coords = machonToCoords(response["data"]["Table"][0]['Machoz']);
                let result = await coordsGetter(coords[0], coords[1]);
                resolve(result);

            })
            .catch(function (error) {
                // handle error
                //console.log(error + ".." + cityName);
                reject(undefined)
            })
            .finally(function () {
                // always executed
            })
    )
}

function machonToCoords(area) {
    if (area == "??????????????") {
        return ["32.18", "34.93"];
    }
    else if (area == "??????????") {
        return ["32.57", "35.30"];
    }
    else if (area == "????????") {
        return ["32.48", "34.59"];
    }
    else if (area == "??????????") {
        return ["32.10", "34.54"];
    }
    else if (area == "???? ????????") {
        return ["32.04", "34.47"];
    }
    else if (area == "??????????") {
        return ["30.36", "34.48"];
    }
    else if (area == "?????????? ????????????????") {
        return ["32.06", "35.11"];
    }
    else {
        return undefined;
    }
}

function coordsGetter(lat, long) {
    return new Promise((resolve) =>
        axios.get("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FMoscow")
            .then(function (response) {
                let min = response["data"]["daily"].temperature_2m_min[0];
                let max = response["data"]["daily"].temperature_2m_max[0];
                let weather = degreesToWeatherLevel(min, max)

                //return weather;
                resolve(weather);

            }))
        .catch(function (error) {
            // handle error
            console.log(error);
            return undefined;
        })
        .finally(function () {
            // always executed
        });
}

function degreesToWeatherLevel(min, max) {
    const deg = Math.floor((min + max) / 2);
    if (deg < 0) {
        return 1;
    }
    else if (deg >= 0 && deg <= 15) {
        return 2;
    }
    else if (deg > 16 && deg <= 25) {
        return 3;
    }
    else if (deg >= 26 && deg <= 40) {
        return 4;
    }
    else if (deg > 40) {
        return 5;
    }
    else {
        return 6;
    }
}
//end of weather section

//holiday section
async function getHoloday(data){//year, month, day) {

    return new Promise((resolve,reject) => {
        
        let url = "https://www.hebcal.com/converter?cfg=json&date=" + data + "&g2h=1&strict=1"; //year + "-" + month + "-" + day
        axios.get(url).then(function (response){
            //console.log(response["data"])
            resolve(response["data"]["events"]);
        }).catch(function (error){
            reject(error)
        })
    })
}
//end of holiday section

//demography section
function getDemography(input) {
    return new Promise ((resolve) =>
        axios.get("https://boardsgenerator.cbs.gov.il/Handlers/WebParts/YishuvimHandler.ashx?dataMode=Yeshuv&filters={%22Years%22:%222021%22}&filtersearch=" + input + "&language=Hebrew&mode=GridData&pageNumber=-1&search=&subject=BaseData")
            .then(function (response) {
                if (response.data["Table"] == 0) {
                    console.log("no result was found")
                    return;
                }
                //console.log(response.data["Table"][0].PepoleNumberJewish)
                let jews = response.data["Table"][0].PepoleNumberJewish;
                let result = undefined;
                if (jews == '-') {
                    jews = 0;
                }
                else {
                    let newString = "";
                    for (let i = 0; i < jews.length; i++) {
                        if (jews.charAt(i) != ',') {
                            newString += jews.charAt(i)
                        }
                    }
                    jews = Number(newString);
                }

                let arabs = response.data["Table"][0].PepoleNumberArab;

                if (arabs == '-') {
                    arabs = 0;
                }
                else {
                    let newString = "";
                    for (let i = 0; i < arabs.length; i++) {
                        if (arabs.charAt(i) != ',') {
                            newString += arabs.charAt(i)
                        }
                    }
                    arabs = Number(newString);
                }

                if (arabs == 0) {
                    result = "??????????"
                }
                else if (jews == 0) {
                    result = "????????"
                }
                else if (jews / arabs < 2 && jews / arabs > 0.5) {
                    result = "??????????"
                }
                else if (jews > arabs) {
                    result = "??????????"
                }
                else {
                    result = "????????"
                }
                resolve(result);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })
    )
}

//end of demography section