import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  id:String,
  grade:String,
  subject:String,
  link: String,
});

export const fileModel = mongoose.model("files", fileSchema);
