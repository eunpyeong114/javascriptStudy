// 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다. 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. "z"는 1만큼 밀면 "a"가 됩니다. 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

// 제한 조건
// 공백은 아무리 밀어도 공백입니다.
// s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
// s의 길이는 8000이하입니다.
// n은 1 이상, 25이하인 자연수입니다.

// 내가 푼 풀이
const arr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
function solution(s, n) {
  var answer = [];
  for (let i = 0; i < s.length; i++) {
    let idx = arr.indexOf(s[i]);
    if (s[i] !== " ") {
      if (idx <= 25 && idx + n <= 25) {
        answer.push(arr[idx + n]);
      } else if (idx <= 25 && idx + n > 25) {
        answer.push(arr[idx + n - 26]);
      } else if (idx <= 51 && idx + n <= 51) {
        answer.push(arr[idx + n]);
      } else if (idx <= 51 && idx + n > 51) {
        answer.push(arr[idx + n - 26]);
      }
    } else {
      answer.push(" ");
    }
  }
  return answer.join("");
}
// 다른 풀이

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution(s, n) {
  let answer = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      // 공백일 경우
      answer += " ";
    } else {
      let idx = alphabet.indexOf(s[i]);
      const word = idx > 25 ? alphabet.slice(26) : alphabet.slice(0, 26);

      idx = word.indexOf(s[i]) + n;
      if (idx >= 26) {
        idx -= 26;
      }
      answer += word[idx];
    }
  }
  return answer;
}

// 다른 풀이

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution(s, n) {
  let answer = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      // 공백일 경우
      answer += " ";
    } else {
      // 소문자인지 먼저 검증한 후
      // 소문자가 맞다면, 소문자 리스트를 저장
      // 소문자가 아니라면, 대문자 리스트를 저장
      const word = lower.includes(s[i]) ? lower : upper;
      let idx = word.indexOf(s[i]) + n;
      if (idx > 25) {
        idx -= 26;
      }
      answer += word[idx];
    }
  }
  return answer;
}

// reduce 매서드를 활용한 풀이

// const lower = "abcdefghijklmnopqrstuvwxyz";
// const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution(s, n) {
  const answer = s.split("").reduce((acc, cur) => {
    const word = lower.includes(cur) ? lower : upper;
    let idx = word.indexOf(cur) + n;

    if (idx >= 26) {
      idx -= 26;
    }
    return acc + (cur === " " ? " " : word[idx]);
  }, "");
  return answer;
}

// 아스키 코드를 이용한 풀이
// a-z :  97 - 122
// A-Z :  65 - 90

function solution(s, n) {
  // charCodeAt 매서드 : 주어진 문자의 아스키 코드(숫자)를 반환
  // String.fromCharCode 매서드 : 아스키 코드(숫자)를 문자로 변환

  let answer = "";

  for (let i = 0; i < s.length; i++) {
    let idx = s[i].charCodeAt() + n;
    if (idx > 122 || (idx > 90 && idx - n < 97)) {
      idx -= 26;
    }
    answer += s[i] === " " ? " " : String.fromCharCode(idx);
  }
  return answer;
}
