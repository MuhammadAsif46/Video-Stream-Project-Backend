import mongoose from "mongoose";
import { DB_NAME } from "./constants";

/*
import express from "express"
const app = express();
(async()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on('error',(error)=>{
      console.error("MongoDB connection error:", error);
      throw error
    })

    app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    // process.exit(1);
    throw err
  }
})()
*/