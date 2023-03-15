// && or || 연산자를 이용해 input1,input2 둘 중 하나라도 true명 true, 두개 모두 false면 false 출력
function boolean(input1, input2) {
  if (input1 === false && input2 === false) {
    return "false";
  } else {
    return "true";
  }
}

// 입력된 값이 짝수 => "Even" 홀수 => "Odd" 0 => "Zero" 출력
function evenOdd(num) {
  if (num === 0) {
    console.log("Zero");
  } else if (num % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}

//입력되는 온도에 따라 문구를 띄워주는 온도계 함수를 생성
//18이하면 "조금 춥네요" 19~23이면 "날씨가 좋네요" 24이상이면 "조금 덥습니다"
function temperature(num) {
  if (num >= 24) {
    return "조금 덥습니다";
  } else if (num >= 19 && num <= 23) {
    return "날씨가 좋네요";
  } else if (num <= 18) {
    return "조급 춥네요";
  }
}

//입력되는 달(month)에 따라 각 달에 며칠이 있는지 보여주는 함수 생성 , ||연산자 사용
// 문제의도에 맞는 방법
function days(month) {
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  } else if (month === 2) {
    return 28;
  } else {
    return 31;
  }
}
// 객체를 이용한 방법도 있음
const monthList = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
function days(month) {
  return monthList[month];
}
// 숫자 2개와 연산자를 입력받아 알맞게 계산하는 미니계산기 함수 생성
// num1과 num2는 숫자열, operator는 문자열로 입력 예정
// operator "+", "/", "-", "*" 이외의 다른 값이 들어온다면 "올바른 입력이 아닙니다"라는 문구를 출력
function calculator(num1, num2, operator) {
  if (operator === "+") {
    const result = num1 + num2;
    console.log(result);
  } else if (operator === "-") {
    const result = num1 - num2;
    console.log(result);
  } else if (operator === "/") {
    const result = num1 / num2;
    console.log(result);
  } else if (operator === "*") {
    const result = num1 * num2;
    console.log(result);
  } else {
    console.log("올바른 입력이 아닙니다");
  }
}
