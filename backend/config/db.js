//connecting mongodb with the database

import mongoose from 'mongoose';
import { ENV_VARS } from './enVars.js';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {

    try{
        const conn= await mongoose.connect(ENV_VARS.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected: " +conn.connection.host);
    }
    catch(error){
        console.error("Error connecting to MONGODB: "+error.message);
        process.exit(1);//1 means error and 0 is sucess
    }
    
};

export default connectDB;