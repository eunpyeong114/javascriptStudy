const fetchData = async () => {
  // API 보내기 요청!!

  const result = await new Promise((성공시함수, 실패시함수) => {
    setTimeout(() => {
      try {
        console.log("업로드 성공!! 다운로드URL 받아왔다~"); // 5초 뒤에 다운로드URL 받아옴
        성공시함수("다운로드URL");
      } catch (error) {
        실패시함수("실패했습니다!!");
      }
    }, 5000);
  });
  console.log(result);
  // .then((res) => {})
  // .catch((error) => {});
  console.log("받아온 다운로드URL 브라우저에 전달!");
};

fetchData();
