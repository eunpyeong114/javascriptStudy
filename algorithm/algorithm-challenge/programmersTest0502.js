// 무인도에 갇힌 사람들을 구명보트를 이용하여 구출하려고 합니다. 구명보트는 작아서 한 번에 최대 2명씩 밖에 탈 수 없고, 무게 제한도 있습니다.

// 예를 들어, 사람들의 몸무게가 [70kg, 50kg, 80kg, 50kg]이고 구명보트의 무게 제한이 100kg이라면 2번째 사람과 4번째 사람은 같이 탈 수 있지만 1번째 사람과 3번째 사람의 무게의 합은 150kg이므로 구명보트의 무게 제한을 초과하여 같이 탈 수 없습니다.

// 구명보트를 최대한 적게 사용하여 모든 사람을 구출하려고 합니다.

// 사람들의 몸무게를 담은 배열 people과 구명보트의 무게 제한 limit가 매개변수로 주어질 때, 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값을 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 무인도에 갇힌 사람은 1명 이상 50,000명 이하입니다.
// 각 사람의 몸무게는 40kg 이상 240kg 이하입니다.
// 구명보트의 무게 제한은 40kg 이상 240kg 이하입니다.
// 구명보트의 무게 제한은 항상 사람들의 몸무게 중 최댓값보다 크게 주어지므로 사람들을 구출할 수 없는 경우는 없습니다.
// 입출력 예
// people	limit	return
// [70, 50, 80, 50]	100	3
// [70, 80, 50]	100	3

// 반복문 활용 풀이
function solution(people, limit) {
  people.sort((a, b) => b - a);
  let answer = 0;
  let last = people.length - 1;

  for (let i = 0; i < people.length; i++) {
    const weight = limit - people[i];

    // 가장 가벼운 사람의 몸무게가 보트가 수용할 수 있는 몸무게보다 작을 경우
    // 보트에 태울 수 있다
    if (weight >= people[last]) {
      last--;
    }
    answer++;
    // 대기열에 아무도 없는 경우
    if (i >= last) {
      return answer;
    }
  }
}

// 매서드 활용한 풀이
function solution(people, limit) {
  people.sort((a, b) => b - a);

  let last = people.length - 1;

  return people.reduce((acc, cur, i) => {
    if (i <= last) {
      const weight = limit - cur;
      if (weight >= people[last]) {
        last--;
      }
      acc++;
    }
    return acc;
  }, 0);
}

// 오픈채팅방
// 카카오톡 오픈채팅방에서는 친구가 아닌 사람들과 대화를 할 수 있는데, 본래 닉네임이 아닌 가상의 닉네임을 사용하여 채팅방에 들어갈 수 있다.

// 신입사원인 김크루는 카카오톡 오픈 채팅방을 개설한 사람을 위해, 다양한 사람들이 들어오고, 나가는 것을 지켜볼 수 있는 관리자창을 만들기로 했다. 채팅방에 누군가 들어오면 다음 메시지가 출력된다.

// "[닉네임]님이 들어왔습니다."

// 채팅방에서 누군가 나가면 다음 메시지가 출력된다.

// "[닉네임]님이 나갔습니다."

// 채팅방에서 닉네임을 변경하는 방법은 다음과 같이 두 가지이다.

// 채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다.
// 채팅방에서 닉네임을 변경한다.
// 닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경된다.

// 예를 들어, 채팅방에 "Muzi"와 "Prodo"라는 닉네임을 사용하는 사람이 순서대로 들어오면 채팅방에는 다음과 같이 메시지가 출력된다.

// "Muzi님이 들어왔습니다."
// "Prodo님이 들어왔습니다."

// 채팅방에 있던 사람이 나가면 채팅방에는 다음과 같이 메시지가 남는다.

// "Muzi님이 들어왔습니다."
// "Prodo님이 들어왔습니다."
// "Muzi님이 나갔습니다."

// Muzi가 나간후 다시 들어올 때, Prodo 라는 닉네임으로 들어올 경우 기존에 채팅방에 남아있던 Muzi도 Prodo로 다음과 같이 변경된다.

// "Prodo님이 들어왔습니다."
// "Prodo님이 들어왔습니다."
// "Prodo님이 나갔습니다."
// "Prodo님이 들어왔습니다."

// 채팅방은 중복 닉네임을 허용하기 때문에, 현재 채팅방에는 Prodo라는 닉네임을 사용하는 사람이 두 명이 있다. 이제, 채팅방에 두 번째로 들어왔던 Prodo가 Ryan으로 닉네임을 변경하면 채팅방 메시지는 다음과 같이 변경된다.

// "Prodo님이 들어왔습니다."
// "Ryan님이 들어왔습니다."
// "Prodo님이 나갔습니다."
// "Prodo님이 들어왔습니다."

// 채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 문자열 배열 record가 매개변수로 주어질 때, 모든 기록이 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지를 문자열 배열 형태로 return 하도록 solution 함수를 완성하라.

// 제한사항
// record는 다음과 같은 문자열이 담긴 배열이며, 길이는 1 이상 100,000 이하이다.
// 다음은 record에 담긴 문자열에 대한 설명이다.
// 모든 유저는 [유저 아이디]로 구분한다.
// [유저 아이디] 사용자가 [닉네임]으로 채팅방에 입장 - "Enter [유저 아이디] [닉네임]" (ex. "Enter uid1234 Muzi")
// [유저 아이디] 사용자가 채팅방에서 퇴장 - "Leave [유저 아이디]" (ex. "Leave uid1234")
// [유저 아이디] 사용자가 닉네임을 [닉네임]으로 변경 - "Change [유저 아이디] [닉네임]" (ex. "Change uid1234 Muzi")
// 첫 단어는 Enter, Leave, Change 중 하나이다.
// 각 단어는 공백으로 구분되어 있으며, 알파벳 대문자, 소문자, 숫자로만 이루어져있다.
// 유저 아이디와 닉네임은 알파벳 대문자, 소문자를 구별한다.
// 유저 아이디와 닉네임의 길이는 1 이상 10 이하이다.
// 채팅방에서 나간 유저가 닉네임을 변경하는 등 잘못 된 입력은 주어지지 않는다.
// 입출력 예
// record	result
// ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]	["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]

// 풀이
function solution(record) {
  const answer = [];

  const user = {}; // 유저들의 최종 닉네임 값을 저장
  for (let i = 0; i < record.length; i++) {
    const [action, uid, nickname] = record[i].split(" ");
    if (nickname) {
      user[uid] = nickname;
    }
    if (action !== "Change") {
      // Enter, Leave 둘 중 하나라면
      answer.push({ action, uid });
    }
  }
  for (let idx in answer) {
    answer[idx] =
      user[answer[idx].uid] +
      (answer[idx].action === "Enter"
        ? "님이 들어왔습니다."
        : "님이 나갔습니다.");
  }
  return answer;
}

// 풀이 2
function solution(record) {
  record = record.map((el) => el.split(" "));
  // 유저들의 최종 닉네임 값을 저장
  const user = record.reduce((acc, cur) => {
    const [action, uid, nickname] = cur;
    if (nickname) acc[uid] = nickname;
    return acc;
  }, {});
  const answer = record.reduce((acc, cur) => {
    const [action, uid] = cur;
    if (action !== "Change") {
      // Enter, Leave 둘 중 하나라면
      acc.push(
        `${user[uid]}님이 ${
          action === "Enter" ? "들어왔습니다." : "나갔습니다."
        }`
      );
    }
    return acc;
  }, []);
}
