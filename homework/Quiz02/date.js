function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  console.log(
    `오늘은 ${year}년 ${month}월 ${day}일 ${hours}:${min}:${sec} 입니다`
  );
}
getToday();
//오늘은 2023년 03월 09일 시:분:초 입니다
