import mongoose from 'mongoose'
import {ENV} from './env.js'

let isConnected = false;

export const connectDB = async ()=>{
    // Prevent multiple connections in serverless environment
    if(isConnected) {
        console.log("Database already connected")
        return;
    }

    try{
        await mongoose.connect(ENV.MONGO_URI, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        })
        isConnected = true;
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error connecting to database", err)
        if(process.env.NODE_ENV !== 'production'){
            process.exit(1)
        }
        throw err; // Re-throw in production for proper error handling
    }
}