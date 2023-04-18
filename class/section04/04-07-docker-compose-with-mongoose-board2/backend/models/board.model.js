import mongoose from "mongoose";

// 통에 담기 전 틀/구조을 만드는 것
const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});

// 통 만들기
export const Board = mongoose.model("Board", boardSchema); // boardSchema라는 구조만 통으로 들어올 수 있다
