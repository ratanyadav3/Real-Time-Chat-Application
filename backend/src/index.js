import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import router from './routers/auth.router.js';
import connectDB from './db/index.db.js';
import cookieParser from 'cookie-parser';


const app = express();
connectDB();

app.use(express.json());
/*
use of express.json 
Reading the raw JSON data from the incoming request.
Parsing it into a JavaScript object.
Storing this object in req.body.
 */
app.use(cookieParser());
/*
Without cookieParser(), parsing this string manually would be tedious. The cookieParser() middleware simplifies this process by:
Parsing the Cookie header.
Converting the cookie string into a JavaScript object.
Storing this object in req.cookies so you can easily access individual cookies by their names.
 */

app.use('/auth',router);

const PORT = 3000;


app.listen(PORT,()=>{
    console.log(`App is running on localhost:${PORT}`);
});