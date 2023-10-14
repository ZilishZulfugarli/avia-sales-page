import express, { json } from "express";
import {DHotelPopular} from "./data/hotel.js"

let app = express();

app.get("/hotels", (req,res)=>{
    res.json(DHotelPopular);
})

const port = 4000;
app.listen(port, ()=>{
    console.log("Mock server is running in http://localhost:"+port )
})