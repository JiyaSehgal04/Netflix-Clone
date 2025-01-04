import{ User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req,res){
   try{
    const {email,password,username} = req.body;

    if(!email || !password || !username){
        return res.status(400).json({sucess:false,message: "Please fill in all fields."});
    }
//to make sure it is a ligitimate email--->computer's way to identify
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if(!emailRegex.test(email)){
        return res.status(400).json({sucess:false,message: "Invalid email."});
   }
   if(password.length < 6){//fixing passwrod's length
    return res.status(400).json({sucess:false,message: "Password must be at least 6 characters"});
   } 
   const existingUserByEmail = await User.findOne({email:email});//checking if the email entered matches the email in the database

   if(existingUserByEmail){
    return res.status(400).json({sucess:false,message: "Email already in use."});
   }

   const existingUserByUsername = await User.findOne({username:username});

   if(existingUserByUsername){
    return res.status(400).json({sucess:false,message: "Username already in use."});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    const PROFILE_PICS =["/avatar1.png", "avatar2.png", "avatar3.png"];//defined in the frontend
    
    const image= PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];//if not already set

    const newUser = new User({
        email:email,//also can be written as email,(js's shortcut)
        password:hashedPassword,
        username:username,
        image:image,
    });

    
        
    await newUser.save(); 
    generateTokenAndSetCookie(newUser._id,res);
        

        res.status(201).json({
            sucess:true, user:{
            ...newUser._doc,
            password:"",
        }});
    




}//try block ends here
catch(error){
    console.log("Error in the signup controller",error.message);
    res.status(500).json({sucess:false, message: "Internal server error :("});
   }

}
  

export async function login(req,res){
    try{
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message: "Please enter both email and Password"});
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        })
    }
    catch(error){
        console.log("Error in the login controller",error.message);
        res.status(500).json({success:false, message: "Internal server error :("});
    }
}

export async function logout(req,res){
  try{
    res.clearCookie("jwt-netflix");
    res.status(200).json({success: true,message: "Logged out successfully"});
  }
  catch(error){
    console.lof("Error in logout controller",error.message);
    res.status(500).json({success:false,message:"Internal server error" });

  }
}


export async function authCheck(req,res){
    try{
        console.log("req.")
        res.status(200).json({success:true,user:req.user});
    }
    catch(error){
        console.log("Error in authCheck controller",error.message);
        res.status(500).json({success:false,message:"Internal server error" });
    }
}