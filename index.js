import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";
const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();
// Extend request's size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors({ credentials:true, origin: ['http://localhost:3000', 'https://gasy-e-cool.vercel.app'] }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
 
app.listen(PORT, ()=> console.log('Server running at port 4000'));