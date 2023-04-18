import express from "express";

const app = express();
// const port =  3000

app.get("/qqq", (req, res) => {
  res.send("정상 처리되었습니다.");
});

app.listen();
// const app = express()
// const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001);
