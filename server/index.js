import express from "express";
import cors from "cors";
import {DHotelPopular} from "./data/hotel.js"
import {DCitiesPlan, DCitiesPopular} from "./data/cities.js"

let app = express();
app.use(cors(["http://127.0.0.1:5500","http://127.0.0.1:5501"]))

app.get("/hotels", (req,res)=>{
    res.json(DHotelPopular);
})

app.get("/popularcities", (req,res)=>{
    res.json(DCitiesPopular);
})

app.get("/plancities", (req,res)=>{
    res.json(DCitiesPlan);
})

const port = 4000;
app.listen(port, ()=>{
    console.log("Mock server is running in http://localhost:"+port )
})