// 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

// "()()" 또는 "(())()" 는 올바른 괄호입니다.
// ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 문자열 s의 길이 : 100,000 이하의 자연수
// 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

// 내 풀이
function solution(s) {
  let answer;
  let check = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      check++;
    } else if (s[i] === ")") {
      check--;
    }
    if (check < 0) {
      return (answer = false);
    }
  }
  if (s[0] === "(" && s[s.length - 1] === ")" && !check) {
    answer = true;
  } else {
    answer = false;
  }
  return answer;
}

// 다른 풀이
function solution(s) {
  // 첫 시작이 닫힌 괄호로 시작하는 경우 = 올바른 괄호가 아니다
  // 마지막이 열린 괄호로 끝나는 경우 = 올바른 괄호가 아니다
  if (s[0] === ")" || s[s.length - 1] === "(") {
    return false;
  }
  // 괄호의 깊이를 체크하는 변수
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    // 열린 괄호라면 1을 더해주고, 닫힌 괄호라면 1을 빼준다.
    depth += s[i] === "(" ? 1 : -1;

    // depth가 0미만일 때 = 닫힌 괄호가 더 많을 때
    if (depth < 0) {
      return false;
    }
  }
  return !depth;
}

// 다른 풀이

function solution(s) {
  // 첫 시작이 닫힌 괄호로 시작하는 경우 = 올바른 괄호가 아니다
  // 마지막이 열린 괄호로 끝나는 경우 = 올바른 괄호가 아니다
  if (s[0] === ")" || s[s.length - 1] === "(") {
    return false;
  }
  // fail이 true가 되면 올바른 괄호가 아니다
  let fail = false;
  return (
    s.split("").reduce((acc, cur) => {
      // 닫힌 괄호가 먼저 들어오거나, 더 많은 경우
      if (acc < 0) fail = true;
      return acc + (cur === "(" ? 1 : -1);
    }, 0) === 0 && !fail
  );
}
