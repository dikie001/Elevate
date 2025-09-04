import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user_id: String,
  full_name: String, 
  nickName:String,
  email:String,
  age: String,
  school: String,
  theme: String,
  passcode:String,
  joined_at: Date,
  
});

export const userModel = mongoose.model("users", userSchema);
