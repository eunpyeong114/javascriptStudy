// 0부터 9까지의 숫자 중 일부가 들어있는 정수 배열 numbers가 매개변수로 주어집니다. numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ numbers의 길이 ≤ 9
// 0 ≤ numbers의 모든 원소 ≤ 9
// numbers의 모든 원소는 서로 다릅니다.

// 내가 푼 풀이
function solution(numbers) {
  let sum = 0;
  numbers.forEach((num) => {
    sum += num;
  });
  return 45 - sum;
}

// 다른 풀이
function solution(numbers) {
  let answer = 0;
  for (let i = 1; i <= 9; i++) {
    if (!numbers.includes(i)) {
      answer += i;
    }
  }
  return answer;
}

// reduce 매서드를 이용한 방식
function solution(numbers) {
  const answer = new Array(9).fill(1).reduce((acc, cur, idx) => {
    const num = cur + idx;
    return (
      acc +
      (numbers.includes(num)
        ? // 배열에 존재한다면, 0을 더해준다.
          0
        : // 배열에 존재하지 않는다면,
          num)
    );
  }, 0);

  return answer;
}

// 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
// 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

// 제한 조건
// a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
// a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.
// a와 b의 대소관계는 정해져있지 않습니다.

// 내가 푼 풀이
function solution(a, b) {
  let sum = 0;
  let max = Math.max(a, b);
  let min = Math.min(a, b);
  for (let i = min; i <= max; i++) {
    sum += i;
  }
  return sum;
}

// 다른 풀이
function solution(a, b) {
  let answer = 0;
  if (a === b) {
    return a;
  }
  // 최솟값
  // 반복문이 실행될 때 설정되는 초깃값(a와 b 중 더 작은 숫자)
  const start = a > b ? b : a;
  // const start = Math.min(a,b);

  // 최댓값
  // 반복문이 종료되는 조건을 설정(a와 b 중 더 큰 숫자)
  const end = a > b ? a : b;
  //const end = Math.max(a,b)

  for (let i = start; i <= end; i++) {
    answer += i;
  }
  return answer;
}

// reduce 매서드를 활용한 풀이
function solution(a, b) {
  if (a === b) {
    return a;
  }
  const start = Math.min(a, b);
  const end = Math.max(a, b);

  const answer = new Array(end - start).fill(1).reduce((acc, cur, i) => {
    const num = start + cur + i;
    return acc + num;
  }, start);
  return answer;
}

// 양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

// 제한 조건
// x는 1 이상, 10000 이하인 정수입니다.

// 내가 푼 풀이
function solution(x) {
  let str = String(x);
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += Number(str[i]);
  }
  return x % sum === 0 ? true : false;
}

// 다른 풀이
function solution(x) {
  // 자릿수의 합을 저장하는 변수
  let answer = 0;
  // 숫자 타입의 x 변수에 담긴 값을 문자열로 변환
  x = String(x);
  for (let i = 0; i < x.length; i++) {
    answer += Number(x[i]);
  }
  // 비교식을 리턴 : 나머지 값이 없다면, true, 있다면 false
  return x % answer === 0;
}

// reduce 매서드를 활용한 풀이
function solution(x) {
  // 자릿수의 합을 저장하는 변수
  const answer = x
    .toString()
    .split("")
    .reduce((acc, cur) => {
      return acc + Number(cur);
    }, 0);
  return x % answer === 0;
}
