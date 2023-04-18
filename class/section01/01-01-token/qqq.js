console.log("Hello World");

function 토큰만들어줘() {
  //문자열내 특정부분을 잘라낸 것 = 토큰
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
}

토큰만들어줘();
