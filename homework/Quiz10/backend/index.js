import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
const swaggerSpec = swaggerJsdoc(options);
import "dotenv/config";
import mongoose from "mongoose";
import { createOg } from "./scraping.js";
import { userModel } from "./models/user.model.js";
import { tokenModel } from "./models/token.model.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { sendTemplateToEmail } from "./email.js";
import { protectPersonal } from "./personal.js";
import { UserController } from "./controllers/user.controller.js";

mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(() => {
    console.log("DB 연결 실패");
  });

mongoose.set("debug", true);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/mini-project", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 3. 토큰 인증 요청 API
app.post("/tokens/phone", async (req, res) => {
  const userPhone = req.body.phone;
  const isValid = checkPhone(userPhone);
  // 휴대폰 번호가 유효하지 않을 경우 오류 응답 보내기
  if (!isValid)
    return res.status(400).send("휴대폰 번호를 제대로 입력해 주세요");
  // 휴대폰 번호가 유효할 경우 토큰 생성
  const userToken = getToken();
  // 토큰 전송
  // sendTokenToSMS(userPhone, userToken);
  // 데이터 베이스 저장하기 위한 값 schema에 맞춰 설정
  const token = new tokenModel({
    token: userToken,
    phone: req.body.phone,
    isAuth: false,
  });
  // 기존 휴대폰 전화가 등록되어 있는지 확인하기 위해 result 선언
  const result = await tokenModel.findOne({ phone: userPhone });
  // result 값이 있다면 인증번호 값만 수정
  if (result) {
    await tokenModel.updateOne(
      {
        phone: userPhone,
      },
      {
        token: userToken,
      }
    );
    // 없다면 새롭게 db에 저장
  } else {
    await token.save();
  }
  res.status(200).send("핸드폰으로 인증 문자가 전송되었습니다!");
});

// 4. 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
  const userPhone = req.body.phone;
  const userToken = req.body.token;
  // db에 해당 휴대전화가 저장되어 있는지 확인하기 위해 result 설정
  const result = await tokenModel.findOne({ phone: userPhone });
  // 만약 저장된 번호가 없거나 입력값과 다르다면 오류 응답 보내기
  if (!result) {
    res.status(401).send("false");
    // 저장된 번호는 맞지만 토큰 번호가 맞지 않는다면 오류 응답 보내기
  } else if (result.token !== userToken) {
    res.status(401).send("false");
    // 전화번호와 토큰값이 일치하는 경우 db에 isAuth 를 true로 변경 및 true 값 응답 보내기
  } else {
    await tokenModel.updateOne(
      {
        phone: userPhone,
      },
      {
        isAuth: true,
      }
    );
    res.send("true");
  }
});

// 1. 회원 가입 API
const userController = new UserController();
app.post("/users", userController.userJoin);
// 2. 템플릿 전송 API
app.get("/users", userController.userSearch);
app.listen(3000);
