
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";


const app= express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT= process.env.PORT||3000;

//contecting to db
connectDB();


app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})

app.listen(PORT,()=>{
    console.log(`Server is runing on the http://localhost:${PORT}`);
})