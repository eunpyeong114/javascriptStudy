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

/*
    하이픈 추가하기

    공백이 존재하지 않는 영어 문자열이 주어집니다.
    해당 문자열에는 연속으로 반복되는 알파벳들이 존재합니다.
    연속되는 알파벳을 탐색하고, 해당되는 두 알파벳 사이에 하이픈(-)을 추가한 문자열을 리턴해주세요.

    - 문자열은 모두 소문자로 구성되어 있습니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      'seoullaarizona'
    
    case2:
      'toasttoasttoast'

    ------------------------------
    output
    ------------------------------

    case1:
      'seoul-la-arizona'

    case2:
      'toast-toast-toast'

*/

function addDash(str) {
  // 여기에서 작업하세요.
  str = str.split("");
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      str.splice(i + 1, 0, "-");
    }
  }
  return str.join("");
}

/**
    크리스마스 선물

    숫자가 담긴 배열 childs가 주어집니다.

    모든 집에 한 명씩의 아이가 살고 있는 동네가 있습니다.
    아이들은 올해 몇 개의 착한일을 했는지에 따라 곧 다가오는 크리스마스에 선물을 받게 됩니다.

    childs 배열에는 각 아이들이 올해 몇번의 착한 일을 했는지, 그 숫자가 담겨 있습니다.
    모든 아이가 아래 주어진 조건에 맞춰 올바른 개수의 선물을 받을 수 있도록 준비해야 합니다.

    - 각 아이들은 최소 하나의 선물은 받아야 합니다.
    - 이웃하고 있는 아이보다 착한 일을 더 많이 한 아이는 이웃한 아이보다는 더 많은 선물을 받아야 합니다.

    산타가 조건에 맞춰 아이들에게 선물을 나눠줄 때, 최소 몇개의 선물이 필요한지 그 개수를 리턴해 주세요.


    예를 들어, 예봄, 여진, 다슬, 정훈, 네명의 아이가 각각 3개, 2개, 4개, 0개의 착한 일을 했다면,
    
    [ 3, 2, 4, 0 ]

    위와 같은 배열이 주어집니다.
    예봄(3)은 하나의 선물을 받습니다. {예봄: 1, 여진: 0, 다슬: 0, 정훈: 0}
    여진(2)은 하나의 선물을 받습니다. {예봄: 1, 여진: 1, 다슬: 0, 정훈: 0}
    예봄(3)은 이웃한 여진(2)보다 착한 일을 더 많이 했으므로 여진보다는 더 많은 선물을 받아야 합니다. {예봄: 2, 여진: 1, 다슬: 0, 정훈: 0}
    다슬(4)은 이웃한 여진(2)보다 착한 일을 더 많이 했으므로 여진보다는 더 많은 선물을 받아야 합니다. {예봄: 2, 여진: 1, 다슬: 2, 정훈: 0}
    정훈(0)은 착한 일을 하진 않았지만 하나의 선물을 받습니다. {예봄: 2, 여진: 1, 다슬: 2, 정훈: 1}
    정훈(0)이 하나의 선물을 받았지만, 다슬(4)은 이미 이웃인 정훈, 여진보다 많은 선물을 받았으므로 더 이상의 선물은 받지 않습니다. {예봄: 2, 여진: 1, 다슬: 2, 정훈: 1}

    결과적으로 산타가 준비해야 하는 최소 개수의 선물은 6개이므로 숫자 6을 리턴해야 합니다.

    - childs 배열의 요소는 모두 숫자입니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      christmasPresent([1, 0, 2])

    case2:
      christmasPresent([1, 2, 2])

    ------------------------------
    output
    ------------------------------

    case1:
      5

    case2:
      4
 */

const christmasPresent = function (childs) {
  // 여기에서 작업하세요.
  const result = Array(childs.length).fill(1);
  // console.log(result)
  let answer = 0;
  let restart;
  for (let i = 0; i < childs.length; i++) {
    if (childs[i] > childs[i + 1] && result[i] === result[i + 1]) {
      result[i]++;

      if (childs[i - 1] > childs[i] && result[i] === result[i - 1]) {
        while (result[i - 1] <= result[i]) {
          result[i - 1]++;
        }
        i = restart;
      }
    } else if (childs[i] < childs[i + 1]) {
      result[i + 1] += result[i];
      restart = i;
    }
  }
  for (let i = 0; i < result.length; i++) {
    answer += result[i];
  }
  return answer;
};

/*
    문자열 회전

    두개의 문자열 str과 goal이 주어집니다.
    str의 가장 뒷 문자를 맨 앞으로 보내는 과정만을 반복해
    goal과 완전히 같은 문자열이 될 수 있는지 확인한 뒤,
    가능하다면 true를, 불가능하다면 false를 리턴해 주세요.

    예를 들어, str = 'abcde' goal = 'deabc'라면,
    위에서 언급한 과정을 두번 반복해 str이 goal과 완전히 같아질 수 있으므로 true를 리턴합니다.

    - 문자열 str, goal의 요소는 모두 알파벳 소문자입니다.
    - 두 문자열 내에 공백은 존재하지 않습니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      rotateString('abcde', 'deabc')

    case2:
      rotateString('abcde', 'cdeba')

    ------------------------------
    output
    ------------------------------

    case1:
      true

    case2:
      false
*/

function rotateString(str, goal) {
  // 여기에서 작업하세요.
  let answer = false;
  for (let i = 0; i < goal.length; i++) {
    let back = str.slice(goal.length - (i + 1));
    let front = str.slice(0, goal.length - 1 - i);
    if (back + front === goal) {
      return (answer = true);
    }
  }
  return answer;
}
