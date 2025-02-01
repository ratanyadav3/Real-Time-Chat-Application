import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import authRoutes from './routers/auth.router.js';
import messageRoutes from './routers/message.router.js';
import connectDB from './db/index.db.js';
import cookieParser from 'cookie-parser';


const app = express();
connectDB();

app.use(express.json());


app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

const PORT = 3000;


app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);

});