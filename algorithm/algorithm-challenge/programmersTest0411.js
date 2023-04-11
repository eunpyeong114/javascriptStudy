// 네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

// 다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

// 1478 → "one4seveneight"
// 234567 → "23four5six7"
// 10203 → "1zerotwozero3"
// 이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

// 내가 푼  풀이
const number = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
function solution(s) {
  for (let i = 0; i < number.length; i++) {
    s = s.replaceAll(number[i], i);
  }
  return Number(s);
}

// 다른 풀이
const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    while (s.includes(numbers[i])) {
      s = s.replace(numbers[i], i);
    }
  }
  return Number(s);
}

// split과 join을 활용한 풀이

//const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine']
function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    s = s.split(numbers[i]).join(i);
  }
  return Number(s);
}

// 정규표현식을 활용한 풀이
// const numbers = [
//   "zero",
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
// ];
function solution(s) {
  // 정규표현식
  for (let i = 0; i < numbers.length; i++) {
    // 정규표현식을 사용하면서 동시에 변수를 이용하고 싶을 때 변수로 만들어주는 매서드
    // new RegExp(변수,global 전역)
    const regExp = new RegExp(numbers[i], "g");
    s = s.replace(regExp, i);
  }
  return Number(s);
}

// 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
// nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다

// 내가 푼  풀이
function solution(nums) {
  let answer = [];
  let notAnswer = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let sum = nums[i] + nums[j] + nums[k];
        answer.push(sum);
        for (let l = 2; l <= sum / 2; l++) {
          if (sum % l === 0) {
            notAnswer.push(sum);
            break;
          }
        }
      }
    }
  }
  return answer.length - notAnswer.length;
}

// 다른 풀이
function solution(nums) {
  let answer = 0;

  // 1. 첫번째 숫자를 가져오는 과정
  for (let i = 0; i < nums.length; i++) {
    // 2. 두번째 숫자를 가져오는 과정
    for (let l = i + 1; l < nums.length; l++) {
      // 3. 세번째 숫자를 가져오는 과정
      for (let j = l + 1; j < nums.length; j++) {
        const sum = nums[i] + nums[l] + nums[j];

        let count = 0;
        for (let o = 1; o <= sum; o++) {
          if (sum % o === 0) {
            count++;
            if (count > 2) {
              // 약수가 2개를 초과한다 = 소수가 아니다
              break;
            }
          }
        }
        if (count === 2) {
          // 약수가 2개다 = 소수가 맞다.
          answer++;
        }
      }
    }
  }
  return answer;
}

// 다른 풀이
function solution(nums) {
  let idx = 0; // 배열을 자르기 위한 인덱스값

  // 1. 첫번째 숫자를 가져오는 과정
  return nums.reduce((acc, num1, i) => {
    idx = i + 1;
    // 2. 두번째 숫자를 가져오는 과정
    nums.slice(idx).forEach((num2) => {
      // 3. 세번째 숫자를 가져오는 과정
      nums.slice(++idx).forEach((num3) => {
        const sum = num1 + num2 + num3;

        let count = 0;
        if (sum % 2 === 1) {
          // 세개의 숫자의 합이 홀수인 경우만
          for (let o = 1; o <= sum; o++) {
            if (sum % o === 0) {
              count++;
            }
            if (count > 2) {
              break;
            }
          }
          if (count === 2) {
            acc++;
          }
        }
      });
    });
    return acc;
  }, 0);
}
