const { parentPort } = require("worker_threads");

parentPort.on("message", (maxSize) => {
  // 부모로부터 명령 메세지가 오면 콜백함수 실행!
  // postMessage()의 전달인자(1000000000)를 매개변수로 받음
  let sum = 0;
  for (let i = 0; i < maxSize; i++) {
    sum += 1;
  }
  parentPort.postMessage(sum);
  parentPort.close();
});
