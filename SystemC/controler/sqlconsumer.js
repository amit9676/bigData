
import { Kafka } from 'kafkajs'
import pkg from 'mssql'
import cors from 'cors'
import axios from 'axios'
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

function sqlInsert(BranchID,Date,CityName,WeatherID,Holiday,Demography,FlavorID,Weight) {
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
        var weather = 6;
        request.query("insert into BigML(BranchID,Date,CityName,WeatherID,Holiday,Demography,FlavorID,Weight) values "
        +"(" + BranchID + ",'" + Date + "', N'" + CityName + "'," + WeatherID + ",N'" + Holiday + "',N'" + Demography + "'," + FlavorID + "," + Weight + ");", function (err, recordset) {
            if (err) { console.log(err); }
            else {
                console.log("succes")
            }
        });
    });
}

const consumer = kafka.consumer({ groupId: 'user1' })
consumer.connect()
await consumer.subscribe({ topic: 'kafki', fromBeginning: true })// SalesIcecream
consumer.run({
    //rfeqcraobqwynvpctn@tmmbt.com
    eachMessage: async ({ topic, partition, message }) => {
        try{
            const mysales = message.value.toString().split(",")
            let d = new Date(mysales[0])
            //console.log(mysales)
            mysales[0] = d.getFullYear().toString() + "-" + d.toLocaleString("default", { month: "2-digit" }) + "-" + d.toLocaleString("default", { day: "2-digit" });
            let city = bid_town[parseInt(mysales[1]) - 1]['Town']
            let weather = await getCityRecieveWeather(city)
            let holidayarr = await getHoloday(mysales[0]) // data[]
            let holiday = ""
            for (var i=1;i<holidayarr.length;i++){
                holiday = holiday + holidayarr[i] + ","
            }
            let demog = await getDemography(city)
            let flavor = mysales[2]
            let weight = Number(mysales[3])
            if(demog == 'ערבי'){
                weight-=0.5;
            }
            else if(demog == 'מעורב'){
                weight-=0.25;
            }

            if(weather != 6){
                weight += (0.1 * weather);
            }
            
            if(holiday != ""){
                weight += 0.5;
            }
            if(weight < 0){
                weight = 0;
            }
            //console.log(mysales[1], bid_town[parseInt(mysales[1]) - 1]['BranchID'], weather,holiday,demog.split('').reverse().join(''))
            console.log("mysales[1]: " + mysales[1])
            console.log("mysales[0]: " + mysales[0])
            console.log("city: " + city)
            console.log("weather: " + weather)
            console.log("holiday: " + holiday)
            console.log("demog: " + demog)
            console.log("flavor: " + flavor)
            console.log("weight: " + weight)
            console.log("---------------------------------------")
            await sqlInsert(mysales[1],mysales[0],city,weather,holiday,demog,flavor,weight)
        }
        catch{
            console.log("error detected - SKIP");
        }
        
    }
})



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
                console.log(error + ".." + cityName);
                reject(error);
            })
            .finally(function () {
                // always executed
            })
    )
}

function machonToCoords(area) {
    if (area == "ירושלים") {
        return ["32.18", "34.93"];
    }
    else if (area == "הצפון") {
        return ["32.57", "35.30"];
    }
    else if (area == "חיפה") {
        return ["32.48", "34.59"];
    }
    else if (area == "המרכז") {
        return ["32.10", "34.54"];
    }
    else if (area == "תל אביב") {
        return ["32.04", "34.47"];
    }
    else if (area == "הדרום") {
        return ["30.36", "34.48"];
    }
    else if (area == "יהודה והשומרון") {
        return ["32.06", "35.11"];
    }
    else {
        return undefined;
    }
}

function coordsGetter(lat, long) {
    return new Promise((resolve,reject) =>
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
            reject(error)
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
    else if (deg >= 16 && deg <= 25) {
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
    return new Promise ((resolve,reject) =>
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
                    result = "יהודי"
                }
                else if (jews == 0) {
                    result = "ערבי"
                }
                else if (jews / arabs < 2 && jews / arabs > 0.5) {
                    result = "מעורב"
                }
                else if (jews > arabs) {
                    result = "יהודי"
                }
                else {
                    result = "ערבי"
                }
                resolve(result);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                reject(error)
            })
            .finally(function () {
                // always executed
            })
    )
}

//end of demography section
