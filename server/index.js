import express, { json } from "express";
import cors from "cors";
import { DHotel, DHotelPopular } from "./data/hotel.js"
import { DCitiesPlan, DCitiesPopular } from "./data/cities.js"
import fetch from 'node-fetch'
import xml2js from "xml2js"

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
//     'X-RapidAPI-Key': '15d87485edmshf5aba973f82cf54p136ebajsnbb5f3a8b7c02',
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

    const url = 'https://timetable-lookup.p.rapidapi.com/TimeTable/GYD/IST/20231217/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '15d87485edmshf5aba973f82cf54p136ebajsnbb5f3a8b7c02',
            'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const xmlData = await response.text();



        xml2js.parseString(xmlData, (err, result) => {
            if (err) {
                console.log("XML data error:", err)
            }
            else {
                const jsonData = JSON.stringify(result, null, 2)
                res.send(jsonData).status(200);
            }
        })
    } catch (error) {
        console.error(error);
    }
})


const port = 4000;
app.listen(port, () => {
    console.log("Mock server is running in http://localhost:" + port)
})
