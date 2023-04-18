import express from "express"; // 요즘 방식 => module
// const express = require("express"); // 옛날방식 => commonjs
// import와 require가 동일한 역할

const app = express(); // app에 API 만드는 (express)기능 다 넣어둠

app.get("/qqq", function (req, res) {
  res.send("ㅁㅇㄴㄹㄴㅁㅇㄹㅇㄴ");
});
//일종의 서버다 24시간 실행이 되어야지만 정보처리가능

app.listen(3000);
//listen 기다리다라는 의미
// 3000 = 포트(0~65535사이의 임의의 숫자)
// node.js 하게 되면 24시간동안 실행됨 끄기 -> 컨트롤 c
