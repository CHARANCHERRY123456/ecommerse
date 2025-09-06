import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import  connectDb from './db.js'
connectDb()

const app = express();

app.use(express.json());

app.use(cors('*'));
console.log(process.env.MONGO_URI);


app.get("/" , (req , res)=> res.send("woprking bro don't worry"))

app.listen(3000 , ()=>console.log("server started"))