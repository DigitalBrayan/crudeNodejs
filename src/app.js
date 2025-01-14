import express from "express";
import mongoose from "mongoose";
import  bookRoutes  from './routes/book.routes.js';
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

//usamos express para los middleware
const app = express();
app.use(bodyParser.json()); //parseador de body,s

//concetarnos a la bd
mongoose.connect(process.env.MONGO_URL, {
  dbname: process.env.MONGO_DB_NAME,
});
const db = mongoose.connection;

// console.log(db,22222222222);


//midleware para asignacion de las rutas
app.use('/books',  bookRoutes)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("servidor en puerto ", port);
});
