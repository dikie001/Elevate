import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { fileModel } from "./models/fileModel.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { userModel } from "./models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(MONGODB);
const saltRounds = 10;

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
        {
          folder: "elevate",
          resource_type: "raw",
          public_id: `${uuidv4().pdf}`,
          type: "upload",
        },
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

// Create a New User
app.post("/api/auth", upload.none("new_user"), async (req, res) => {
  const data = JSON.parse(req.body.new_user);
  const newUser = {
    user_id: uuidv4(),
    full_name: data.name,
    age: data.age,
    grade: data.grade,
    school: data.school,
    theme: data.theme,
    joined_at: new Date().toDateString(),
  };
  console.log(newUser);
  try {
    await userModel.create(newUser);
    console.log(`User with id: ${newUser.user_id} added to Database...`);
    res.status(201).json({
      message: "user created successfully",
      name: newUser.full_name,
      user_id: newUser.user_id,
    });
  } catch (err) {
    // res.status(500).json("Failed to save details", err);
    console.log(err);
  }
});

// Create New PAsscode
app.post(
  "/api/update_user/create_passcode/:id",
  upload.none("create_passcode"),
  async (req, res) => {
    console.log("server hit..");
    const passcode = req.body.create_passcode;
    const user_id = req.params.id;
    try {
      // Generate Encrypted pass
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(passcode, salt, async function (err, hash) {
          // Update the user Schema with the encrypted password pass
          const user = await userModel.findOneAndUpdate(
            { user_id },
            { passcode: hash },
            { new: true }
          );
          console.log(user);
          res.status(201).json({ message: "Passsword created successfully" });
        });
      });
    } catch (err) {
      res.status(500).json({ messsage: err });
    }
  }
);

// Change the current passcode
app.post(
  "/api/update_user/change_passcode/:id",
  upload.none(),
  async (req, res) => {
    const user_id = req.params.id;
    const plainPasscode = req.body.change_passcode;

    try {
      const user = await userModel.findOne({ user_id });
      const hashedPasscode = user && user.passcode;

      if (!hashedPasscode) {
        res.status(404).json({ message: "No password available" });
        console.log("No passsword for this user");
        return;
      }

      // Compare the hash with the pass
      bcrypt.compare(
        plainPasscode,
        hashedPasscode,
        async function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          if (!result) res.status(401).json({ result });
          console.log(result);

          // Store the new passcode to DB
          if (result) {
            console.log("moving on to update pass");
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(plainPasscode, salt, async function (err, hash) {
                err && console.log(err);
                try {
                  await userModel.findOneAndUpdate(
                    { user_id },
                    { passcode: hash },
                    { new: true }
                  );
                  res
                    .status(201)
                    .json({ message: "Passcode updated successfully" });
                } catch (err) {
                  // res.status(500).json({ err });
                  console.log(err);
                }
              });
            });
          }
        }
      );
    } catch (err) {
      //   res.status(500).json({ err });
      console.log(err);
    }
  }
);

app.listen(PORT, (req, res) => {
  console.log(`Server running on http://localhost:${PORT}`);
});
