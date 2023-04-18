// console.log("Hello World");

//인증번호 요청 API
// 1. 휴대폰 번호를 제대로 입력했는지 2. 인증번호 6자리 만들기 3. 인증번호 휴대폰 번호에 전송하기

// 나쁜 예
// function createTokenOfPhone(qqq) {
//   //문자열내 특정부분을 잘라낸 것 = 토큰
//   //qqq라는 변수에는 휴대폰 번호가 들어온다 가정 / qqq:매개변수(parameter)
//   // 1. 휴대폰 번호 자릿수 맞는지 확인하기(10~11)
//   if (qqq.length >= 10) {
//     if (qqq.length <= 11) {
//       // 2. 휴대폰 토큰(인증번호) 6자리 만들기
//       const result = String(Math.floor(Math.random() * 1000000)).padStart(
//         6,
//         "0"
//       );
//       console.log(result);
//       // 3. 휴대폰 번호에 토큰 전송하기
//       console.log(qqq + "번호로 인증번호 " + result + "를 전송합니다.");
//     } else {
//       console.log("에러 발생! 휴대폰 번호를 제대로 입력해 주세요!");
//     }
//   } else {
//     console.log("에러 발생! 휴대폰 번호를 제대로 입력해 주세요!");
//   }
// }

// 좋은 예제로 리팩토링(같은 기능과 결과를 가져오는 코드를 다시 더 효율적으로 만드는 것)
function createTokenOfPhone(qqq) {
  //문자열내 특정부분을 잘라낸 것 = 토큰
  //qqq라는 변수에는 휴대폰 번호가 들어온다 가정 / qqq:매개변수(parameter)
  // 1. 휴대폰 번호 자릿수 맞는지 확인하기(10~11)
  if (qqq.length < 10 || qqq.length > 11) {
    console.log("에러 발생! 휴대폰 번호를 제대로 입력해 주세요!");
    return; //early exit 패턴 (에러가 먼저 있는 것 추려내고 return으로 종료 후 아래는 정상인 경우 수행하는 방법)
  }
  // 2. 휴대폰 토큰(인증번호) 6자리 만들기
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);

  // 3. 휴대폰 번호에 토큰 전송하기
  console.log(qqq + "번호로 인증번호 " + result + "를 전송합니다.");
}

// 버튼클릭 가정
createTokenOfPhone("01012345678"); //01012345678: 인자(argument)
