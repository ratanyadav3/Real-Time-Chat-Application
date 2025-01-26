
import {User as UserModel} from '../models/user.model.js';


export const signup = async(req,res)=>{
    const {username, fullname,email,password} = req.body;
   try {
    const CheckUser = await UserModel.findOne({email});
    if(CheckUser) return res.status(400).send("Invalid Credentials");

    const NewUser = await UserModel.create({
        username,
        fullname,
        email,
        password
    })

    const token = NewUser.generateAccessToken();
    res.cookie("token",token);
    res.status(200).json({
        _id:NewUser._id,
        fullname:NewUser.fullname,
        username:NewUser.username,
        email:NewUser.email
    })
    
   } catch (error) {
    console.log("Error in SignUp Controller",error.message);
    return res.status(500).json({message:"internal server error"});
    
   }
}


export const signin = async(req,res)=>{
    const{email,password} = req.body;
    try {

    const CheckUser = await UserModel.findOne({email});
    if(!CheckUser) return res.status(400).send("Invalid Credentils");

    const pass = await CheckUser.isPasswordCorrect(password);
    if(!pass) return res.status(400).send("Inavlid Credentials");

    const token = CheckUser.generateAccessToken();
    res.cookie("token",token);

    res.status(200).json({
    _id:CheckUser._id,
    fullname:CheckUser.fullname,
    username:CheckUser.username,
    email:CheckUser.email,
    });
        
    } catch (error) {

        console.log("Error in Login Controller",error.message);
        return res.ststus(500).json({message:"Internal Server Error"});
        
    }
}


export const logout = (req,res)=>{
    try {
        res.cookie("token","",{maxage:0});
        return res.status(200).json({message:"Logged Out successfully"});
    } catch (error) {
        console.log("Error in Logout Controller",error.message);
        return res.status(500).json({message:"Internal Server Error "});
        
    }
}


export const updateProfile = (req,res)=>{

}