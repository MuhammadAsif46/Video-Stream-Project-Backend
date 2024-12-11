import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use middlware or configuration usage:
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
