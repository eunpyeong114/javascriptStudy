// 슈퍼 게임 개발자 오렐리는 큰 고민에 빠졌다. 그녀가 만든 프랜즈 오천성이 대성공을 거뒀지만, 요즘 신규 사용자의 수가 급감한 것이다. 원인은 신규 사용자와 기존 사용자 사이에 스테이지 차이가 너무 큰 것이 문제였다.

// 이 문제를 어떻게 할까 고민 한 그녀는 동적으로 게임 시간을 늘려서 난이도를 조절하기로 했다. 역시 슈퍼 개발자라 대부분의 로직은 쉽게 구현했지만, 실패율을 구하는 부분에서 위기에 빠지고 말았다. 오렐리를 위해 실패율을 구하는 코드를 완성하라.

// 실패율은 다음과 같이 정의한다.
// 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
// 전체 스테이지의 개수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages가 매개변수로 주어질 때, 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.

// 제한사항
// 스테이지의 개수 N은 1 이상 500 이하의 자연수이다.
// stages의 길이는 1 이상 200,000 이하이다.
// stages에는 1 이상 N + 1 이하의 자연수가 담겨있다.
// 각 자연수는 사용자가 현재 도전 중인 스테이지의 번호를 나타낸다.
// 단, N + 1 은 마지막 스테이지(N 번째 스테이지) 까지 클리어 한 사용자를 나타낸다.
// 만약 실패율이 같은 스테이지가 있다면 작은 번호의 스테이지가 먼저 오도록 하면 된다.
// 스테이지에 도달한 유저가 없는 경우 해당 스테이지의 실패율은 0 으로 정의한다.

function solution(N, stages) {
  // 모든 스테이지의 번호를 오름차순 형태로 정렬
  stages.sort((a, b) => (a > b ? 1 : -1));
  const infos = [];
  for (let i = 1; i <= N; i++) {
    infos.push({
      stage: i, // 현재 스테이지의 번호
      users: 0, // 스테이지를 클리어 하지 못한 유저의 수
      fail: 0, // 실패율
    });
  }
  let allUsers = stages.length; // (이전 스테이지를 클리어하지 못한 유저를 제외한)모든 유저의 수_
  for (let i = 0; i < stages.length; i++) {
    if (infos[stages[i] - 1]) {
      infos[stages[i] - 1].users++;
      // 현재 스테이지의 번호와 다음 스테이지의 번호가 동일하지 않을 경우
      // = 현재 스테이지의 합산이 완료되는 시점
      if (stages[i] !== stages[i + 1]) {
        infos[stages[i] - 1].fail = infos[stages[i] - 1].users / allUsers;
        // 현재 스테이지를 클리어하지 못한 유저 수만큼 전체 유저수에서 삭감
        allUsers -= infos[stages[i] - 1].users;
      }
    }
  }
  return infos
    .sort((a, b) => {
      return a.fail > b.fail ? -1 : 1;
    })
    .map((el) => el.stage);
}

// 매서드 활용한 풀이
function solution(N, stages) {
  stages.sort((a, b) => (a > b ? 1 : -1));
  let allUsers = stages.length;
  return new Array(N)
    .fill(1)
    .map((num, i) => {
      const stage = num + i;
      const result = stages.slice(
        stages.indexOf(stage),
        stages.lastIndexOf(stage) + 1
      );
      const fail = result.length / allUsers;
      allUsers -= result.length;

      return { stage, fail };
    })
    .sort((a, b) => (a.fail > b.fail ? -1 : 1))
    .map((el) => el.stage);
}
