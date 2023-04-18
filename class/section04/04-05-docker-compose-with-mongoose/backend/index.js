import express from "express"; // 요즘 방식 => module                // export default 가져오기
// const express = require("express"); // 옛날방식 => commonjs
// import와 require가 동일한 역할
// import qqq from "./phone.js"; // export default 가져오기
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // export 가져오기
// import aldkfjklhladksfj from "express"; // export default 가져오기 즉 이때는 변수명 중요치 않음
// import qqq, { checkPhone as zzzz, getToken, sendTokenToSMS } from "./phone.js"; //expor와 export default 같이 섞여 가져올 때 // export도 as 사용하면 이름바꿔서 가져올 수 있음
// import * as ttt from './phone.js'  // export가 너무 많아서 다 쓰기 귀찮을 때 * 과 as로 변수 선언하구 아래처럼 사용하면 됨
// ttt.checkPhone()
// ttt.default()
// ttt.getToken()
// ttt.sendTokenToSMS()
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import { options } from "./swagger/config.js";
const 명세서 = swaggerJsdoc(options);
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => {
    console.log("db 접속에 성공하였습니다.");
  })
  .catch(() => {
    console.log("db 접속에 실패하였습니다.");
  });

const app = express(); // app에 API 만드는 (express)기능 다 넣어둠
app.use(express.json()); // api 에 하나 하나 설정을 등록해주고 싶을 때 use() 사용 // express.json()을 해야 JSON데이터 형태로 받아올 수 있게 해줌//옛날에는 bodyParser사용
app.use(cors()); // cors 설치후 import후 적용 + 어떤 주소든지 다 허용한다는 의미 (제한하려면 {주소}추가해줘야함)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(명세서));
app.get("/boards", function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
  // 조회하면 데이터(게시글 번호 /작성자 /제목 /내용)를 '객체'형태 배열에 담겨서 변수로 저장하게 됨
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
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("================");
  console.log(req.body);

  // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
  res.send("게시글 등록에 성공하였습니다.");
});

app.post("/tokens/phone", function (req, res) {
  const myphone = req.body.qqq;

  const isValid = checkPhone(myphone); //boolean타입인 경우 변수명 is로 시작하게 선언(일반적)
  if (isValid === false) return;

  // 2. 휴대폰 토큰(인증번호) 6자리 만들기
  const myToken = getToken();

  // 3. 휴대폰 번호에 토큰 전송하기
  sendTokenToSMS(myphone, myToken);
  res.send("인증완료!!!");
});

app.post("/users", function (req, res) {
  const { name, age, school, email } = req.body;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;
  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, age, school, email });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);

  res.send("가입완료!!!");
});
app.listen(3000);
