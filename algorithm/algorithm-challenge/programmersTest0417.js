// 자연수 n이 매개변수로 주어집니다. n을 3진법 상에서 앞뒤로 뒤집은 후, 이를 다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// n은 1 이상 100,000,000 이하인 자연수입니다.

// 풀이 1
function solution(n) {
  n = n.toString(3);
  let reverse = "";
  for (let i = n.length - 1; i >= 0; i--) {
    reverse += n[i];
  }
  return parseInt(reverse, 3);
}

// 풀이 2
function solution(n) {
  n = n
    .toString(3) // 10진법 => 3진법으로 변환
    .split("") // 문자열을 배열로 변환
    .reverse() // 배열의 순서를 반전
    .join(""); // 배열을 문자열로 변환
  return parseInt(n, 3);
}

// 0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.

// x의 모든 0을 제거합니다.
// x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
// 예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.

// 0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// s의 길이는 1 이상 150,000 이하입니다.
// s에는 '1'이 최소 하나 이상 포함되어 있습니다.

// 풀이
function solution(s) {
  let count = 0; // 이진 변환이 시도된 횟수
  let remove = 0; // 0이 제거된 개수

  console.log(s);
  while (s !== "1") {
    // s가 '1'이 될 때까지 무한하게 이진 변환을 적용
    count++;

    let temp = ""; // s에서 1만 남겨진 문자열(=0이 제거된 문자열)
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "0") {
        // "0"이라면 문자열에서 제거
        remove++;
        continue; // 다음 반복문으로 이동
      }
      // "0"이 아니라면(="1") 새로운 문자열에 저장
      temp += s[i];
    }
    s = temp.length; // '0'이 제거된 문자열의 길이
    s = s.toString(2); // 문자열의 길이를 2진법으로 변환
  }
  return [count, remove];
}

// 재귀함수를 이용한 방법
function solution(s) {
  // 비구조할당 // 각각의 인덱스에 값을 매치
  let [count, remove] = [0, 0];

  function recursion(s) {
    if (s === "1") {
      return [count, remove];
    }
    count++;

    s = s.split("").filter((num) => {
      if (num === "0") remove++;
      return num === "1";
    }).length;
    return recursion(s.toString(2));
  }
  return recursion(s);
}
