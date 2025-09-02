import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { fileModel } from "./models/fileModel.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(MONGODB);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get  File from frontend
app.post("/api/file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileData = JSON.parse(req.body.data);
    console.log(fileData);

    const result = await cloudinary.uploader
      .upload_stream(
        { folder: "elevate", resource_type: "raw" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ error: "Cloudinary upload failed" });
          }
          const link = result.secure_url;
          fileModel
            .create({ id: uuidv4(), ...fileData, link })
            .then(() => console.log("File link saved to DB"))
            .catch((err) =>
              console.error("Error saving file link to DB:", err)
            );

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

//Fetch Files from DB and send to frondend
app.get("/api/subjects", async (req, res) => {
  try {
    const allFiles = await fileModel.find();
    res.status(200).json(allFiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data from database" });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on http://localhost:${PORT}`);
});
