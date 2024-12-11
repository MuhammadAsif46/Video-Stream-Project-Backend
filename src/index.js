import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

// SECOND APPROACH -- BEST --
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection failed:", err);
  });

// FIRST APPROACH -- COMMON --
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
