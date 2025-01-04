//check before showing the searched data that they are logged in or not
//user must decode the jwt token in the cookies

import jwt from "jsonwebtoken";
import{ ENV_VARS } from '../config/enVars.js';
import { User } from "../models/user.model.js";

export const protectRoute= async(req,res,next) =>{
    try{
        const token = req.cookies["jwt-netflix"];

        if(!token){
            return res.status(404).json({success:false,message:"Unauthorized- No Token provided"});
        }

        const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized- Invalid Token"});
        }
        console.log("Decoded JWT:", decoded);
        //if get the token we can use it for the user
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        req.user=user;

        next();

    }catch(error){
        console.log("Error in protectRoute middleware:",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};
