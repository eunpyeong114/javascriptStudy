// 1부터 n까지 번호가 붙어있는 n명의 사람이 영어 끝말잇기를 하고 있습니다. 영어 끝말잇기는 다음과 같은 규칙으로 진행됩니다.

// 마지막 사람이 단어를 말한 다음에는 다시 1번부터 시작합니다.
// 1번부터 번호 순서대로 한 사람씩 차례대로 단어를 말합니다.
// 앞사람이 말한 단어의 마지막 문자로 시작하는 단어를 말해야 합니다.
// 이전에 등장했던 단어는 사용할 수 없습니다.
// 한 글자인 단어는 인정되지 않습니다.
// 다음은 3명이 끝말잇기를 하는 상황을 나타냅니다.

// tank → kick → know → wheel → land → dream → mother → robot → tank

// 위 끝말잇기는 다음과 같이 진행됩니다.

// 1번 사람이 자신의 첫 번째 차례에 tank를 말합니다.
// 2번 사람이 자신의 첫 번째 차례에 kick을 말합니다.
// 3번 사람이 자신의 첫 번째 차례에 know를 말합니다.
// 1번 사람이 자신의 두 번째 차례에 wheel을 말합니다.
// (계속 진행)
// 끝말잇기를 계속 진행해 나가다 보면, 3번 사람이 자신의 세 번째 차례에 말한 tank 라는 단어는 이전에 등장했던 단어이므로 탈락하게 됩니다.

// 사람의 수 n과 사람들이 순서대로 말한 단어 words 가 매개변수로 주어질 때, 가장 먼저 탈락하는 사람의 번호와 그 사람이 자신의 몇 번째 차례에 탈락하는지를 구해서 return 하도록 solution 함수를 완성해주세요.

// 제한 사항
// 끝말잇기에 참여하는 사람의 수 n은 2 이상 10 이하의 자연수입니다.
// words는 끝말잇기에 사용한 단어들이 순서대로 들어있는 배열이며, 길이는 n 이상 100 이하입니다.
// 단어의 길이는 2 이상 50 이하입니다.
// 모든 단어는 알파벳 소문자로만 이루어져 있습니다.
// 끝말잇기에 사용되는 단어의 뜻(의미)은 신경 쓰지 않으셔도 됩니다.
// 정답은 [ 번호, 차례 ] 형태로 return 해주세요.
// 만약 주어진 단어들로 탈락자가 생기지 않는다면, [0, 0]을 return 해주세요.

// 풀이 1
function solution(n, words) {
  for (let i = 1; i < words.length; i++) {
    let player = (i % n) + 1; // 어떤 사람이 탈락했는지
    let turn = Math.floor(i / n) + 1; // 몇번째 차례에서 탈락했는지

    // 이전 사람이 말한 단어의 맨 마지막 알파벳을 가져온다
    let lastLetter = words[i - 1][words[i - 1].length - 1];
    // 현재 사람이 말한 단어의 가장 앞에 있는 알파벳을 가져온다
    let firstLetter = words[i][0];
    // 앞 사람이 말한 단어의 마지막 알파벳과 현재 게임의 사람이 말한 단어의 앞 부분이 일치하지 않는다면
    // 내가 말한 단어의 인덱스 값이 최초로 그 단어의 위치에 있는 인덱스 값과 동일하지 않을 때
    if (lastLetter !== firstLetter || words.indexOf(words[i]) !== i) {
      return [player, turn];
    }
  }
  return [0, 0];
}

// 풀이 2
function solution(n, words) {
  let stop = false; // 최초 탈락자가 생긴 경우, 게임을 진행하지 않게 하는 스위치 변수
  return words.slice(1).reduce(
    (acc, cur, i) => {
      let lastLetter = words[i].at(-1);
      let firstLetter = words[i + 1][0];

      const player = (++i % n) + 1;
      const turn = Math.trunc(i / n) + 1;

      // 최초 탈락자가 생긴 시점
      if (!stop) {
        if (lastLetter !== firstLetter || words.indexOf(cur) !== i) {
          stop = true;
          return [player, turn]; // return 해주면 acc값으로 들어감
        }
      }
      return acc;
    },
    [0, 0]
  );
}

// 풀이 3
function solution(n, words) {
  let player = 1;
  let turn = 1;

  const result = words.slice(1).some((cur, i) => {
    let lastLetter = words[i].at(-1);
    let firstLetter = cur[0];

    player = (++i % n) + 1;
    turn = Math.trunc(i / n) + 1;

    return lastLetter !== firstLetter || words.indexOf(cur) !== i;
  });
  return !result ? [0, 0] : [player, turn];
}
