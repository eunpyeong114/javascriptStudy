// 문제 설명
// 배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다. 예를 들면,
// arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
// arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
// 배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 배열 arr의 크기 : 1,000,000 이하의 자연수
// 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

// 내 풀이
function solution(arr) {
  var answer = [];
  let element = arr[0];
  answer.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (element !== arr[i]) {
      element = arr[i];
      answer.push(element);
    }
  }
  return answer;
}

// 또 다른 방법
function solution(arr) {
  const answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== answer[answer.length - 1]) {
      answer.push(arr[i]);
    }
  }
  return answer;
}

// 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 함수, solution을 완성해주세요.

// 제한 조건
// num은 int 범위의 정수입니다.
// 0은 짝수입니다.

//내 풀이
function solution(num) {
  var answer = "";
  if (num % 2 === 0) {
    answer = "Even";
  } else {
    answer = "Odd";
  }
  return answer;
}

// 또 다른 방법
function solution(num) {
  return num % 2 ? "Odd" : "Even";
}

// 정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.

// 제한사항
// arr은 길이 1 이상, 100 이하인 배열입니다.
// arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.

// 내 풀이
function solution(arr) {
  var answer = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  answer = sum / arr.length;
  return answer;
}

// reduce를 활용한 방법
function solution(arr) {
  const sum = arr.reduce((acc, cur) => {
    return acc + cur;
  });
  return sum / arr.length;
}

//   프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
// 전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 *으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

// 제한 조건
// phone_number는 길이 4 이상, 20이하인 문자열입니다.

// 내 풀이
function solution(phone_number) {
  var answer = "";
  for (let i = 0; i < phone_number.length; i++) {
    if (i < phone_number.length - 4) {
      answer += "*";
    } else {
      answer += phone_number[i];
    }
  }
  return answer;
}

// 또 다른 방법(매서드활용)
function solution(phone_number) {
  let answer = "";
  answer = answer.padStart(phone_number.length - 4, "*");
  answer += phone_number.slice(phone_number.length - 4);
  return answer;
}
