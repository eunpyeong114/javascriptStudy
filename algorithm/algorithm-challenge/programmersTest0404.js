// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요. 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다. 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.

// 제한 사항
// 두 수는 1이상 1000000이하의 자연수입니다.

// 내가 푼 풀이
function solution(n, m) {
  let max = Math.max(n, m);
  let min = Math.min(n, m);
  let maxResult;
  for (let i = max; i > 0; i--) {
    if (n % i === 0 && m % i === 0) {
      maxResult = i;
      break;
    }
  }
  let minResult = maxResult * (n / maxResult) * (m / maxResult);
  return [maxResult, minResult];
}

// 다른 풀이
function solution(n, m) {
  // 최대공약수 : 두 수의 약수 중에서(공통되는) 제일 큰 수
  // 최소공배수 : 두 수의 배수 중에서(공통되는) 제일 작은 수

  // 최대공약수 구하기
  let max = 0; // 제일 큰 값
  for (let i = 1; i <= m; i++) {
    if (n % i === 0 && m % i === 0) {
      max = i;
    }
  }

  // 최소공배수 구하기
  let min = 0;
  for (let i = m; i <= n * m; i += m) {
    if (i % n === 0) {
      min = i;
      break;
    }
  }
  return [max];
}

function solution(n, m) {
  // 유클리드 호제법
  // - 최대공약수를 구하기 위한 알고리즘(공식)

  // a를 b로 나눴을 때 (큰 수를 작은 수로 나눴을 때)
  // 나머지 값이  0이 되면, 작은 수가 최대공약수 된다.
  // 만약에  0이 되지 않는 다면 작윽 수가 큰 수가 되고 나머지 값이 작은 수가 된다.
  // 다시 나누는 과정을 반복해서 나머지 값이 0이 나오면, 작은 수가 최대공약수가 된다.

  let a = m; // 큰 수
  let b = n; // 작은 수
  let r = 0; // a를 b로 나눴을 때 나머지 값이 들어온다.
  // console.log(m % n)
  while (a % b > 0) {
    r = a % b;
    a = b; // 큰 수에 작은 수를 다시 할당
    b = r;
  }

  // 최소공배수 : n과 m을 곱한 값에 최대 공약수를 나눠준 값
  return [b, (n * m) / b];
}
