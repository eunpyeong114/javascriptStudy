// 수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

// 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
// 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
// 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

// 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한 조건
// 시험은 최대 10,000 문제로 구성되어있습니다.
// 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
// 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

// 내가 푼 풀이
function solution(answers) {
  var answer = [];
  let one = 0;
  let two = 0;
  let three = 0;
  for (let i = 0; i < answers.length; i = i + 5) {
    if (answers[i] === 1) {
      one++;
    }
    if (answers[i + 1] === 2) {
      one++;
    }
    if (answers[i + 2] === 3) {
      one++;
    }
    if (answers[i + 3] === 4) {
      one++;
    }
    if (answers[i + 4] === 5) {
      one++;
    }
  }

  for (let i = 0; i < answers.length; i++) {
    if (answers[2 * i] === 2) {
      two++;
    }
  }

  for (let i = 0; i < answers.length; i = i + 8) {
    if (answers[i + 1] === 1) {
      two++;
    }
    if (answers[i + 3] === 3) {
      two++;
    }
    if (answers[i + 5] === 4) {
      two++;
    }
    if (answers[i + 7] === 5) {
      two++;
    }
  }

  for (let i = 0; i < answers.length; i = i + 10) {
    if (answers[i] === 3) {
      three++;
    }
    if (answers[i + 1] === 3) {
      three++;
    }
    if (answers[i + 2] === 1) {
      three++;
    }
    if (answers[i + 3] === 1) {
      three++;
    }
    if (answers[i + 4] === 2) {
      three++;
    }
    if (answers[i + 5] === 2) {
      three++;
    }
    if (answers[i + 6] === 4) {
      three++;
    }
    if (answers[i + 7] === 4) {
      three++;
    }
    if (answers[i + 8] === 5) {
      three++;
    }
    if (answers[i + 9] === 5) {
      three++;
    }
  }
  if (one === Math.max(one, two, three)) {
    answer.push(1);
  }
  if (two === Math.max(one, two, three)) {
    answer.push(2);
  }
  if (three === Math.max(one, two, three)) {
    answer.push(3);
  }

  return answer.sort();
}

// 다른 풀이

// 아래 풀이에 모두 이용되는 answerTable
const answerTable = [
  // 1번 수포자가 찍는 패턴
  [1, 2, 3, 4, 5], // 5개의 숫자
  // 2번 수포자가 찍는 패턴
  [2, 1, 2, 3, 2, 4, 2, 5], // 8개의 숫자
  // 3번 수포자가 찍는 패턴
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5], // 10개의 숫자
];

function solution(answers) {
  // 학생들의 점수를 저장하는 배열
  const score = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < answerTable.length; j++) {
      const answer = answerTable[j][i % answerTable[j].length];

      if (answer === answers[i]) {
        score[j]++;
      }
    }
  }
  // 제일 많이 맞춘 문제의 수를 뽑아온다.
  const biggest = Math.max(...score);
  const answer = [];
  for (let i = 0; i < score.length; i++) {
    if (score[i] === biggest) {
      answer.push(i + 1);
    }
  }
  return answer;
}

// 매서드 활용한 풀이
function solution(answers) {
  // 학생들의 점수를 저장하는 배열
  const scoreList = answerTable.map((el, i) => {
    const score = answers.reduce((acc, cur, j) => {
      return acc + (el[j % el.length] === cur ? 1 : 0);
    }, 0);
    return { student: i + 1, score };
  });
  // 제일 많이 맞춘 문제의 수를 뽑아온다
  const biggest = Math.max(
    ...scoreList.map((el) => {
      return el.score;
    })
  );
  // 가장 많이 맞춘 학생만  남긴다
  return scoreList
    .filter((el) => {
      return el.score === biggest;
      // 학생의 번호만 뽑아서 배열에 담아준다
    })
    .map((el) => {
      return el.student;
    });
}
