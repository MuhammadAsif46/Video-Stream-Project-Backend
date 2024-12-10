import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGOBD_URI}/${DB_NAME}`
        );
        console.log(`\n MongoDB connected !! BD HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("MongoDB Connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;