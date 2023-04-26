const { Worker } = require("worker_threads");

const start = () => {
  let totalSum = 0;
  for (let i = 0; i < 9; i++) {
    const worker = new Worker("./worker.js");
    worker.postMessage(1000000000);

    worker.on("message", (result) => {
      // result에는 자식에게 받은 postMessage의 전달인자(=sum)!
      totalSum += result;
      console.log(`나는 ${i}번째 일꾼이고, 현재까지 총 합은 ${totalSum}이야`);
    });
  }
};

start();
