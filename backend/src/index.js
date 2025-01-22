import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import router from './routers/auth.router.js';
import connectDB from './db/index.db.js';


const app = express();
connectDB();

app.use('/auth',router);

const PORT = 3000;


app.listen(PORT,()=>{
    console.log(`App is running on localhost:${PORT}`);
});