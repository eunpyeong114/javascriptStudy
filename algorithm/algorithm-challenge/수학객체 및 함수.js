//random 객체를 이용하여 1~100까지 무작위 숫자가 나오도록 하여 number과 비교해야 합니다.
//number보다 큰 수면 Win, 작은 수면 Lose라는 문구를 띄워주세요.
function random() {
  let number = 50;
  let randomNum = Math.floor(Math.random() * 100);
  if (randomNum > number) {
    console.log("Win");
  } else if (randomNum < number) {
    console.log("lose");
  }
}

//숫자열인 입력데이터 2개를 받아 나누기 기능을 하는 함수를 만들어야 합니다 + 입력 인자는 숫자열
// 표현식, 선언식, 화살표 함수로 모두 만들줄 알아야 합니다. 함수의 이름과 입력데이터는 자유롭게 지어도 됩니다.
// 함수선언식
function divide1(num1, num2) {
  const result = num1 / num2;
  console.log(result);
}
// 함수표현식
const divide2 = function (num1, num2) {
  const result = num1 / num2;
  console.log(result);
};
// 화살표함수
const divide3 = (num1, num2) => {
  const result = num1 / num2;
  console.log(result);
};

//비밀번호 2개를 입력받아 대소문자 구분없이 비교하는 기능을 하는 함수를 화살표 함수를 이용해 만들어야 합니다.
//추가 조건 1. 만약 비밀번호가 8~16자리가 아니라면, "비밀번호는 8~16"자리여야 합니다" 라는 문구를 띄워야 합니다.
//추가 조건 2. 만약 두 개의 비밀번호 값이 서로 다르면 "비밀번호를 다시 확인해주세요" 라는 문구를 띄워야 합니다.
//입력 데이터는 문자열 / 화살표 함수
const validation = (pw1, pw2) => {
  let password1 = pw1.toLowerCase();
  let password2 = pw2.toLowerCase();

  if (password1 !== password2) {
    console.log("비밀번호를 다시 확인해 주세요");
    return;
  } else if (password1.length < 8 || password1.length > 16) {
    console.log("비밀번호는 8~16자리여야 합니다.");
    return;
  }
};

//setTimeout을 이용하여 2초 뒤 "자동 로그아웃"이라는 문구를 띄우는 함수를 만들고 실행해보세요.
const timer = setTimeout(() => {
  console.log("자동 로그아웃");
}, 2000);

timer;
