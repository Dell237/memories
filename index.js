import express from "express"; //as a framework for creating the routing of our application
import bodyParser from "body-parser"; //send und req fügt sie dem hinzu req.body
import mongoose from "mongoose"; //so that we don#t have to manually reset the server every time we make a change
import cors from "cors"; //to enable cross origin requests
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";


const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));

app.use(cors());

app.use("/routes", postRoutes);



const PORT = process.env.PORT;


mongoose.connect(process.env.MONGO_URI)
.then(() =>app.listen( PORT , () => console.log(`server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

