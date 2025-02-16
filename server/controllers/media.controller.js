import Media from "../models/media.model.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error fetching media", error: error.message });
  }
};

export const getFilteredMedia = async (req, res) => {
  try {
    const { title, type } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: new RegExp(title, "i") };
    }

    if (type) {
      if (!["video", "audio"].includes(type)) {
        return res.status(400).json({ message: "Invalid media type. Use 'video' or 'audio'." });
      }
      filter.type = type;
    }

    const media = await Media.find(filter);

    res.json(
      media.map((item) => ({
        _id: item._id,
        title: item.title || "Untitled",
        type: item.type,
        url: item.url,
        description: item.description || "",
        createdAt: item.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching media", error: error.message });
  }
};




export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const mediaType = req.file.mimetype.split("/")[0]; 

    const cloudinaryResponse = await cloudinary.uploader.upload_large(req.file.path, {
      resource_type: "video", 
      folder: "clinikkTV",
      chunk_size: 50 * 1024 * 1024,
      eager: [{ format: "mp4" }],  
      eager_async: false,  
    });

    const newMedia = new Media({
      title: req.body.title.trim(),
      type: mediaType,
      url: cloudinaryResponse.secure_url,
      description: req.body.description || "",
    });

    await newMedia.save();

    res.status(201).json({
      message: "Media uploaded successfully",
      media: newMedia,
    });

  } catch (error) {
    res.status(500).json({ message: "Media upload failed", error: error.message });
  }
};
