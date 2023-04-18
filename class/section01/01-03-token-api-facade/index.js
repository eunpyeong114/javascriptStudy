//퍼사드(facade) 패턴으로 리팩토링

function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생! 휴대폰 번호를 제대로 입력해 주세요!");
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

function sendTokenToSMS(myphone, myToken) {
  console.log(myphone + "번호로 인증번호 " + myToken + "를 전송합니다.");
}

function createTokenOfPhone(myphone) {
  //qqq:매개변수(parameter)
  // 1. 휴대폰 검증하는 로직
  const isValid = checkPhone(myphone); //boolean타입인 경우 변수명 is로 시작하게 선언(일반적)
  // 2. 휴대폰 토큰(인증번호) 6자리 만들기
  if (isValid === false) return;
  const myToken = getToken();
  // 3. 휴대폰 번호에 토큰 전송하기
  sendTokenToSMS(myphone, myToken);
}

// 버튼클릭 가정
createTokenOfPhone("01012345678"); //01012345678: 인자(argument)
