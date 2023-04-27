// 선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

// 예를 들어 선행 스킬 순서가 스파크 → 라이트닝 볼트 → 썬더일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

// 위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 스파크 → 힐링 → 라이트닝 볼트 → 썬더와 같은 스킬트리는 가능하지만, 썬더 → 스파크나 라이트닝 볼트 → 스파크 → 힐링 → 썬더와 같은 스킬트리는 불가능합니다.

// 선행 스킬 순서 skill과 유저들이 만든 스킬트리1를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

// 제한 조건
// 스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
// 스킬 순서와 스킬트리는 문자열로 표기합니다.
// 예를 들어, C → B → D 라면 "CBD"로 표기합니다
// 선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
// skill_trees는 길이 1 이상 20 이하인 배열입니다.
// skill_trees의 원소는 스킬을 나타내는 문자열입니다.
// skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.
// 입출력 예
// skill	skill_trees	return
// "CBD"	["BACDE", "CBADF", "AECB", "BDA"]	2
// 입출력 예 설명
// "BACDE": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트립니다.
// "CBADF": 가능한 스킬트리입니다.
// "AECB": 가능한 스킬트리입니다.
// "BDA": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트리입니다.
//

// 풀이
function solution(skill, skill_trees) {
  let answer = 0;

  for (let i = 0; i < skill_trees.length; i++) {
    let filter = ""; // 유저가 배운 스킬트리에 선행스킬이 포함된 스킬만 저장
    for (let j = 0; j < skill_trees[i].length; j++) {
      if (skill.includes(skill_trees[i][j])) {
        // 유저가 배운 스킬이 선행스킬에 포함되어 있다면
        filter += skill_trees[i][j];
      }
    }

    // 선행스킬을 하나도 배우지 않은 유저라면
    // 무조건 가능한 스킬트리를 만들어주기 위해, skill을 할당한다.
    if (filter === "") filter = skill;
    if (skill.includes(filter)) {
      // 선행스킬 안에 유저가 배운 스킬이 포함되어 있는지
      if (skill.indexOf(filter[0]) === 0) {
        // 유저가 제일 먼저 배운 스킬이 선행스킬의 첫번째 스킬과 일치하는지
        answer++;
      }
    }
  }
  return answer;
}

// 다른 풀이
function solution(skill, skill_trees) {
  return skill_trees.reduce((acc, cur) => {
    // 유저가 배운 스킬에 선행스킬이 포함된 스킬만 걸려준다.
    const filter = cur
      .split("")
      .filter((str) => {
        return skill.includes(str);
      })
      .join("");

    return (
      acc +
      Number(
        // 해당 유저가 배운 스킬트리가(선행스킬만) 선행스킬 안에 포함되어 있는지
        // 유저가 먼저 배운 스킬이 선행스킬의 가장 첫번째 스킬과 동일한지
        (skill.includes(filter) && skill[0] === filter[0]) ||
          // 유저가 배운 스킬이 선행스킬에 아무것도 포함되어 있지 않다면
          !filter
      )
    );
  }, 0);
}
