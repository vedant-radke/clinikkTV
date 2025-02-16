import express from "express"
import { getAllMedia, getFilteredMedia, uploadMedia } from "../controllers/media.controller.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllMedia)
router.get("/search", getFilteredMedia)
router.post("/upload", upload.single("file"), uploadMedia);




export default router