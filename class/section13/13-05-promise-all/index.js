const fetchData = async () => {
  // API 보내기 요청!!

  console.time("=== 개별 Promise 각각 ===");
  await new Promise((성공시함수) => {
    setTimeout(() => {
      성공시함수("다운로드URL");
    }, 2000);
  });

  await new Promise((성공시함수) => {
    setTimeout(() => {
      성공시함수("다운로드URL");
    }, 3000);
  });

  await new Promise((성공시함수) => {
    setTimeout(() => {
      성공시함수("다운로드URL");
    }, 1000);
  });
  console.timeEnd("=== 개별 Promise 각각 ===");
};

fetchData();

const fetchData2 = async () => {
  // API 보내기 요청!!
  //   await Promise.all([promise, promise, promise]);
  // 서로 독립적인 요청인 경우에는 promise.all 하는 것이 이득!

  console.time("=== 한방 Promise.all ===");
  const results = await Promise.all([
    new Promise((성공시함수) => {
      setTimeout(() => {
        성공시함수("다운로드URL");
      }, 2000);
    }),
    new Promise((성공시함수) => {
      setTimeout(() => {
        성공시함수("다운로드URL");
      }, 3000);
    }),

    new Promise((성공시함수) => {
      setTimeout(() => {
        성공시함수("다운로드URL");
      }, 1000);
    }),
  ]);
  console.log(results);
  console.timeEnd("=== 한방 Promise.all ===");
};

fetchData2();
