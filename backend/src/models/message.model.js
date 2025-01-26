import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    ReceiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type: String,
        required:true
    },
    image:{
        tyep:String,
        required:true
    }
},{timestamps:true})