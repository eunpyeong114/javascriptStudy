// S사에서는 각 부서에 필요한 물품을 지원해 주기 위해 부서별로 물품을 구매하는데 필요한 금액을 조사했습니다. 그러나, 전체 예산이 정해져 있기 때문에 모든 부서의 물품을 구매해 줄 수는 없습니다. 그래서 최대한 많은 부서의 물품을 구매해 줄 수 있도록 하려고 합니다.

// 물품을 구매해 줄 때는 각 부서가 신청한 금액만큼을 모두 지원해 줘야 합니다. 예를 들어 1,000원을 신청한 부서에는 정확히 1,000원을 지원해야 하며, 1,000원보다 적은 금액을 지원해 줄 수는 없습니다.

// 부서별로 신청한 금액이 들어있는 배열 d와 예산 budget이 매개변수로 주어질 때, 최대 몇 개의 부서에 물품을 지원할 수 있는지 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// d는 부서별로 신청한 금액이 들어있는 배열이며, 길이(전체 부서의 개수)는 1 이상 100 이하입니다.
// d의 각 원소는 부서별로 신청한 금액을 나타내며, 부서별 신청 금액은 1 이상 100,000 이하의 자연수입니다.
// budget은 예산을 나타내며, 1 이상 10,000,000 이하의 자연수입니다.

// 내가 푼 풀이
function solution(d, budget) {
  let answer = 0;
  d.sort((a, b) => (a > b ? 1 : -1));
  for (let i = 0; i < d.length; i++) {
    budget -= d[i];
    if (budget < 0) return i;
    answer++;
  }
  return answer;
}

// 다른 풀이
function solution(d, budget) {
  let answer = 0;
  // 신청한  금액을  오름차순으로 정렬
  d.sort((a, b) => (a > b ? 1 : -1));
  // 부서들이 신청한 금액의 총 합산
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    sum += d[i];
    // 부서에게 지급한 금액이 전체 예산을 넘어설 때
    if (sum > budget) return answer;
    answer++;
  }
  // 전체 예산으로 모든 부서에게 지급이 가능한 경우
  return answer;
}

// 다른 풀이

function solution(d, budget) {
  d.sort((a, b) => (a > b ? 1 : -1));
  let idx = 0;
  while (budget - d[idx] >= 0) {
    budget -= d[idx];
    idx++;
  }
  return idx;
}

// 다른 풀이
function solution(d, budget) {
  return d
    .sort((a, b) => (a > b ? 1 : -1))
    .filter((money) => {
      budget -= money;
      return budget >= 0;
    }).length;
}

// 피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.

// 예를들어

// F(2) = F(0) + F(1) = 0 + 1 = 1
// F(3) = F(1) + F(2) = 1 + 1 = 2
// F(4) = F(2) + F(3) = 1 + 2 = 3
// F(5) = F(3) + F(4) = 2 + 3 = 5
// 와 같이 이어집니다.

// 2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.

// 제한 사항
// n은 2 이상 100,000 이하인 자연수입니다.

function solution(n) {
  // 피보나치 수의 결과를 저장하는 배열
  // 0번째 인덱스에는 0번째 피보나치의 결과
  // 1번째 인덱스에는 1번째 피보나치의 결과
  const answer = [0, 1];

  for (let i = 2; i <= n; i++) {
    // (A + B) % C = ((A % C) + (B % C)) % C
    answer[i] = (answer[i - 1] + answer[i - 2]) % 1234567;
  }
  return answer[n];
}

function solution(n) {
  let prev = 0; // 0번째 피보나치 수를 저장
  return Array.from(new Array(n - 1), (_) => 1).reduce((acc) => {
    const sum = (acc + prev) % 1234567;
    prev = acc; // F(n-2)에 F(n-1)를 재할당
    return sum;
    console.log(acc, prev);
  }, 1); // 1번째 피보나치 수를 초기값으로 사용
}
