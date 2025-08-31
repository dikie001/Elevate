import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  link: String,
});

export const fileModel = mongoose.model("files", fileSchema);
