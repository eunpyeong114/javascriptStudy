import mongoose from "mongoose";
import { tokenModel } from "./models/token.model.js";
import express from "express";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://my-database:27017/Token")
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(() => {
    console.log("DB 연결 실패");
  });

// respond with "hello world" when a GET request is made to the homepage
app.post("/tokens/phone", async (req, res) => {
  console.log(req.body);
  const myphone = req.body.phone;

  const isValid = checkPhone(myphone); //boolean타입인 경우 변수명 is로 시작하게 선언(일반적)
  if (isValid === false) return;

  // 2. 휴대폰 토큰(인증번호) 6자리 만들기
  const myToken = getToken();
  // 3. 휴대폰 번호가 DB에 저장되어 있는지 확인 -> yes: 인증 토큰 업데이트 no: 휴대폰 번호 / 토큰 등록 및 isAuth false

  // 4. 휴대폰 번호에 토큰 전송하기
  // sendTokenToSMS(myphone, myToken);
  const token = new tokenModel({
    token: myToken,
    phone: myphone,
    isAuth: false,
  });
  const result = await tokenModel.findOne({ phone: myphone });
  if (result) {
    await tokenModel.updateOne(
      {
        phone: myphone,
      },
      {
        token: myToken,
      }
    );
  } else {
    await token.save();
  }
  res.send(`${myToken}인증번호 전송에 성공하였습니다.`);
});

app.patch("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  const mytoken = req.body.token;
  const result = await tokenModel.findOne({ phone: myphone });
  // const token = new tokenModel({
  //   isAuth: false,
  // });
  console.log(result.token);
  console.log(result.phone);
  if (result.phone) {
    if (mytoken === result.token) {
      await tokenModel.updateOne(
        {
          token: mytoken,
        },
        {
          isAuth: true,
        }
      );
      res.send("true");
    } else {
      isAuth = false;
      res.send("false");
      return;
    }
  } else {
    res.send("false");
  }
});

app.listen(3000);
