// 여러 군데서 공통적으로 사용하는 함수를 모아두는 js (통상적으로 이름 utils.js으로 지음)

export function getToday() {
  const aaa = new Date();
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
