import express, { json } from "express";
import cors from "cors";
import { DHotel, DHotelPopular } from "./data/hotel.js"
import { DCitiesPlan, DCitiesPopular } from "./data/cities.js"
import fetch from 'node-fetch'
import xml2js from "xml2js"


// var from = document.getElementById("from").value;
// var to = document.getElementById("to").value;
// var date = document.getElementById("date").value;

var from = "GYD";
var to = "IST";
var date = "20231012";


let app = express();
app.use(cors(["http://127.0.0.1:5500", "http://127.0.0.1:5501"]))

app.get("/popularhotels", (req, res) => {
    res.json(DHotelPopular);
})

app.get("/popularcities", (req, res) => {
    res.json(DCitiesPopular);
})

app.get("/plancities", (req, res) => {
    res.json(DCitiesPlan);
})

app.get("/hotels", (req, res) => {
    res.json(DHotel);
})

app.get("/hotel/:id", (req, res) => {
    let id = Number(req.params.id);
    res.json(DHotel.find(x => x.id === id));
    res.json(DHotel);
})

// app.get("/airports", async (req,res)=>{

// const url = 'https://timetable-lookup.p.rapidapi.com/airports/GYD/';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '673318f3famsh9bad1d78d367b28p1f4d57jsn7d9858af26e5',
//     'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await fetch(url, options);
//         const xmlData = await response.text();



//         xml2js.parseString(xmlData ,(err,result)=>{
//             if(err){
//                 console.log("XML data error:", err)
//             }
//             else{
//                 const jsonData = JSON.stringify(result, null, 2)
//                 res.send(jsonData).status(200);
//             }
//         })
// } catch (error) {
// 	console.error(error);
// }
// })




app.get("/flights", async (req, res) => {
    // Extract input values from query parameters in the request URL
    const originAirportCode = req.query.origin; // Example: GYD
    const destinationAirportCode = req.query.destination; // Example: IST
    const date = req.query.date; // Example: 20231012

    const url = `https://timetable-lookup.p.rapidapi.com/TimeTable/${originAirportCode}/${destinationAirportCode}/${date}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '673318f3famsh9bad1d78d367b28p1f4d57jsn7d9858af26e5',
            'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const xmlData = await response.text();

        xml2js.parseString(xmlData, (err, result) => {
            if (err) {
                console.log("XML data error:", err);
                res.status(500).send("Error processing XML data");
            } else {
                const jsonData = JSON.stringify(result, null, 2);
                res.status(200).send(jsonData);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error making the API request");
    }
});



const port = 4000;
app.listen(port, () => {
    console.log("Mock server is running in http://localhost:" + port)
})
