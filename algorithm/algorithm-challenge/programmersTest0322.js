// 자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
// 예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.

// 제한사항
// N의 범위 : 100,000,000 이하의 자연수

// 내가 푼 풀이
function solution(n) {
  var answer = 0;
  n = String(n);
  for (let i = 0; i < m.length; i++) {
    answer += Number(n[i]);
  }
  return answer;
}

// reduce 매서드를 활용한 방법
function solution(n) {
  const answer = String(n)
    .split("")
    .reduce((acc, cur) => {
      return acc + Number(cur);
    }, 0);
  return answer;
}

// 함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.

// 제한 조건
// x는 -10000000 이상, 10000000 이하인 정수입니다.
// n은 1000 이하인 자연수입니다.

// 내가 푼 풀이
function solution(x, n) {
  var answer = [];
  for (let i = 1; i <= n; i++) {
    answer.push(x * i);
  }
  return answer;
}

// 매서드를 활용한 방법
function solution(x, n) {
  const answer = new Array(n).fill(1).map((num, i) => {
    return (num + i) * x;
  });
}

// 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
// s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

// 제한 사항
// str은 길이 1 이상인 문자열입니다.

// 내가 푼 풀이
function solution(s) {
  let arr = [...s];
  arr = arr.sort().reverse();
  let answer = arr.join("");
  return answer;
}

// 매서드 활용 1
function solution(s) {
  const answer = [];

  for (let i = 0; i < s.length; i++) {
    answer.push(s[i]);
  }
  answer.sort((a, b) => {
    return a > b ? -1 : 1;
  });
  return answer.join("");
}
// 매서드 활용 2
function solution(s) {
  const answer = s
    .split("")
    .sort((a, b) => {
      return a > b ? -1 : 1;
    })
    .join("");
  return answer;
}

// 배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.
// 예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

// array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
// 1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
// 2에서 나온 배열의 3번째 숫자는 5입니다.
// 배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// array의 길이는 1 이상 100 이하입니다.
// array의 각 원소는 1 이상 100 이하입니다.
// commands의 길이는 1 이상 50 이하입니다.
// commands의 각 원소는 길이가 3입니다.

// 내가 푼 풀이
function solution(array, commands) {
  const answer = [];
  for (let i = 0; i < commands.length; i++) {
    const result = array
      .slice(commands[i][0] - 1, commands[i][1])
      .sort((a, b) => a - b);
    const newResult = result[commands[i][2] - 1];
    answer.push(newResult);
  }
  return answer;
}

// 매서드 활용 풀이 1
function solution(array, commands) {
  const answer = [];

  for (let idx = 0; idx < commands.length; idx++) {
    const i = commands[idx][0];
    const j = commands[idx][1];
    const k = commands[idx][2];

    const result = array.slice(i - 1, j).sort((a, b) => {
      return a - b;
    });
    answer.push(result[k - 1]);
  }
  return answer;
}

// 매서드 활용 풀이 2
function solution(array, commands) {
  const answer = commands.map((el) => {
    const result = array.slice(el[0] - 1, el[1]).sort((a, b) => a - b);
    return result[el[2] - 1];
  });
  return answer;
}
