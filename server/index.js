import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import router from './router/index.js';

import  connectDb from './db.js'
connectDb()

const app = express();

app.use(express.json());
app.use(morgan("dev"))

app.use(cors('*'));
app.use("/api", router);

app.get("/" , (req , res)=> res.send("woprking bro don't worry"))

app.listen(3000 , ()=>console.log("server started"))