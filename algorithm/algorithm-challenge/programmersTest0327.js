// 임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
// n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

// 제한 사항
// n은 1이상, 50000000000000 이하인 양의 정수입니다.

// 내가 푼 풀이
function solution(n) {
  const remainder = Math.sqrt(n) - Math.floor(Math.sqrt(n));
  if (remainder === 0) {
    return (Math.sqrt(n) + 1) * (Math.sqrt(n) + 1);
  } else {
    return -1;
  }
}

// 다른 풀이(good) 내가 반복문이 약하다는 것 알게 됨.
function solution(n) {
  let answer = -1;
  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      return (i + 1) ** 2;
    }
  }
}

// 다른 풀이
function solution(n) {
  let sqrt = Math.sqrt(n);
  if (Number.isInteger(sqrt)) {
    // 정수인 경우 : 제곱근이 있는 경우
    return (sqrt + 1) ** 2;
  } else {
    // 정수가 아닌 경우 : 제곱근이 없는 경우
    return -1;
  }
}

// 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

// 제한 조건
// arr은 길이 1 이상인 배열입니다.
// 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.

// 다른 풀이
function solution(arr) {
  let min = arr[0];
  const answer = [];
  //1. 제일 작은 수 찾기
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  //2. 제일 작은 수를 제외한 데이터를 배열에 추가
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      answer.push(arr[i]);
    }
  }

  // 빈 배열인지 체크해서
  // 빈 배열이라면 -1이 담긴 배열을 리턴
  // 아니라면 2번째 과정에서 받아온 배열을 그냥 리턴
  return answer.length === 0 ? [-1] : answer;
}

// 매서드 활용 풀이
function solution(arr) {
  //1. 제일 작은 수 찾기
  const min = Math.min(...arr);

  //2. 제일 작은 수를 제외한 데이터를 배열에 추가
  const answer = arr.filter((num) => {
    return num !== min;
  });
  return answer.length === 0 ? [-1] : answer;
}
