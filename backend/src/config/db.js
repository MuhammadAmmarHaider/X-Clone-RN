import mongoose from 'mongoose'
import {ENV} from './env.js'

export const connectDB = async ()=>{
    try{
        await mongoose.connect(ENV.MONGO_URI)
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error connecting to database", err)
        process.exit(1)
    }
}