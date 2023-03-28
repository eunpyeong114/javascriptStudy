// 1937년 Collatz란 사람에 의해 제기된 이 추측은, 주어진 수가 1이 될 때까지 다음 작업을 반복하면, 모든 수를 1로 만들 수 있다는 추측입니다. 작업은 다음과 같습니다.

// 1-1. 입력된 수가 짝수라면 2로 나눕니다.
// 1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더합니다.
// 2. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복합니다.
// 예를 들어, 주어진 수가 6이라면 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 이 되어 총 8번 만에 1이 됩니다. 위 작업을 몇 번이나 반복해야 하는지 반환하는 함수, solution을 완성해 주세요. 단, 주어진 수가 1인 경우에는 0을, 작업을 500번 반복할 때까지 1이 되지 않는다면 –1을 반환해 주세요.

// 제한 사항
// 입력된 수, num은 1 이상 8,000,000 미만인 정수입니다.

// 내가 푼 풀이
function solution(num) {
  let count = 0;
  for (let i = 0; i < 500; i++) {
    if (num === 1) {
      return count;
    } else if (num === 2) {
      count++;
      return count;
    } else if (num % 2 === 1) {
      count++;
      num = num * 3 + 1;
    } else if (num % 2 === 0) {
      count++;
      num = num / 2;
    }
  }
  return num !== 1 ? -1 : count;
}
// 다른 풀이
function solution(num) {
  let count = 0;

  for (let i = 0; i < 500; i++) {
    if (num === 1) {
      return count;
    }
    count++;

    num = num % 2 === 0 ? num / 2 : num * 3 + 1;
  }
  return -1;
}
// forEach를 활용한 풀이
function solution(num) {
  let answer = 0;

  const result = new Array(500).fill(1).forEach((el) => {
    if (num !== 1) {
      answer++;
      num = num % 2 === 0 ? num / 2 : num * 3 + 1;
    }
  });

  return num !== 1 ? -1 : answer;
}

// 정수 배열 numbers가 주어집니다. numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// numbers의 길이는 2 이상 100 이하입니다.
// numbers의 모든 수는 0 이상 100 이하입니다.

// 내가 푼 풀이
function solution(numbers) {
  let sum = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      sum.push(numbers[i] + numbers[j]);
    }
  }
  let answer = Array.from(new Set(sum)).sort((a, b) => a - b);
  return answer;
}
// 다른 풀이
function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let l = i + 1; l < numbers.length; l++) {
      const sum = numbers[i] + numbers[l];

      if (answer.includes(sum) === false) {
        answer.push(sum);
      }
    }
  }

  return answer.sort((a, b) => a - b);
}

//다른 풀이
function solution(numbers) {
  const answer = new Set([]);

  for (let i = 0; i < numbers.length; i++) {
    for (let l = i + 1; l < numbers.length; l++) {
      const sum = numbers[i] + numbers[l];

      answer.add(sum);
    }
  }
  // return  [...answer].sort( (a, b) => a - b)
  return Array.from(answer).sort((a, b) => a - b);
}

function solution(numbers) {
  const answer = new Set([]);

  for (let i = 0; i < numbers.length; i++) {
    for (let l = i + 1; l < numbers.length; l++) {
      const sum = numbers[i] + numbers[l];

      answer.add(sum);
    }
  }
  // return  [...answer].sort( (a, b) => a - b)
  return Array.from(answer).sort((a, b) => a - b);
}

function solution(numbers) {
  const answer = new Set([]);

  numbers.forEach((num1, i) => {
    numbers.slice(i + 1).forEach((num2) => {
      const sum = num1 + num2;

      answer.add(sum);
    });
  });

  return Array.from(answer).sort((a, b) => a - b);
}
