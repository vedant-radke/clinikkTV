import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js"; 

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("Processing file:", file.originalname, "Mimetype:", file.mimetype);
    return {
      folder: "clinikkTV",
      format: file.mimetype.split("/")[1], 
      resource_type: "auto"
    };
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log("Received file:", file.originalname);
    cb(null, true);
  }
});