import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

const app = express();
// const port =  3000

app.get("/boards", (req, res) => {
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다~",
      contents: "내용이예요!!",
    },
    {
      number: 2,
      writer: "영희",
      title: "영희입니다~",
      contents: "영희이예요!!",
    },
    {
      number: 3,
      writer: "훈이",
      title: "훈이입니다~",
      contents: "훈이이예요!!",
    },
  ];
  res.send(result);
});

app.post("/boards", (req, res) => {
  console.log(req);
  console.log("=========");
  console.log(req.body);

  res.send("게시글 등록에 성공하였습니다.");
});

app.listen(3001);
