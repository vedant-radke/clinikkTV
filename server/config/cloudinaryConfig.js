import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// 🔴 Test Cloudinary Connection
cloudinary.api.ping()
  .then(() => console.log("✅ Cloudinary connected successfully"))
  .catch(err => console.error("❌ Cloudinary connection failed:", err));

export default cloudinary;
