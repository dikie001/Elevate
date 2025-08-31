import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get Image File from frontend
app.post("/api/image", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader
      .upload_stream(
        { folder: "elevate", resource_type: "raw" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ error: "Cloudinary upload failed" });
          }
          return res.status(200).json({
            message: "File uploaded successfully",
            url: result.secure_url,
          });
        }
      )
      .end(file.buffer);
  } catch (err) {
    console.error("Error receiving file:", err);
    return res.status(500).json({ error: "Error receiving file" });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on http://localhost:${PORT}`);
});
