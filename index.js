import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "32mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

app.use(cors());

app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.get("/", (res, req) => {
  res.send("Welcome to Instaverse API");
});

//const CONNECTION_URL = "mongodb://localhost:27017/Instaverse";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log("server started on " + PORT)))
  .catch((err) => console.log(err.message));
