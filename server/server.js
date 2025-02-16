import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import mediaRoutes from "./routes/media.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Route
app.use("/api/media", mediaRoutes)

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Call DB Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Clinikk TV Backend is Running!");
});

app.use((err,res,req,next) => {
  console.log(err);
  next(); 
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
