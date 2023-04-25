import mongoose, { Types } from "mongoose";
// mongoose를 이용해서 user db schema 구성
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: Object,
});

export const userModel = mongoose.model("user", userSchema);
