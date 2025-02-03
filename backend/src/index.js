import dotenv from 'dotenv'
dotenv.config();

import path from "path";
import cors from "cors";
import express from 'express';
import authRoutes from './routers/auth.router.js';
import messageRoutes from './routers/message.router.js';
import connectDB from './db/index.db.js';
import cookieParser from 'cookie-parser';
import { app, server } from "./lib/socket.js";
import bodyParser from "body-parser";


//const app = express();
connectDB();

 app.use(bodyParser.json({ limit: "50mb" })); 
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use(express.json());
const __dirname = path.resolve();

app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

const PORT = process.env.PORT;


server.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);

});