import {User} from '../models/user.model.js'
import {Message} from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from "../lib/socket.js";
 
export const getUsersForSidebar = async(req,res)=>{

    try {
        const loggedUser = req.user._id;
        const allUsers = await User.find({_id:{$ne:loggedUser}},{password:0});

        return res.status(200).json(allUsers);
        
    } catch (error) {
        console.log("Errord in getUsersForSidebar in controllere",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

}

export const getMessage = async(req,res)=>{
    try {
        
        const{id:UserChatWithId}= req.params;
        const myId = req.user._id;
        const message = await Message.find({
        $or:[
            {senderId:myId,receiverId:UserChatWithId},
            {senderId:UserChatWithId,receiverId:myId}
        ]
       })

        return res.status(200).json(message);
    } catch (error) {
        console.log("Error In getMessage Controllers",error.message);
        return res.status(500).json({error:"Internal server Error"});
    }
}
export const sendMessage = async(req,res)=>{

    try {

        const{text,image}= req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image)
        {
            const uploadResponse  = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json(newMessage);

        
    } catch (error) {
        console.log("Error in sendMessage Controller",error.message);
        return res.status(500).json({error:"Internal Server Error "});
    }

}