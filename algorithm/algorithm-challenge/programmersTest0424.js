// 신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.

// 각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
// 신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
// 한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
// k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
// 유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
// 다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고, k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.

// 유저 ID	유저가 신고한 ID	설명
// "muzi"	"frodo"	"muzi"가 "frodo"를 신고했습니다.
// "apeach"	"frodo"	"apeach"가 "frodo"를 신고했습니다.
// "frodo"	"neo"	"frodo"가 "neo"를 신고했습니다.
// "muzi"	"neo"	"muzi"가 "neo"를 신고했습니다.
// "apeach"	"muzi"	"apeach"가 "muzi"를 신고했습니다.
// 각 유저별로 신고당한 횟수는 다음과 같습니다.

// 유저 ID	신고당한 횟수
// "muzi"	1
// "frodo"	2
// "apeach"	0
// "neo"	2
// 위 예시에서는 2번 이상 신고당한 "frodo"와 "neo"의 게시판 이용이 정지됩니다. 이때, 각 유저별로 신고한 아이디와 정지된 아이디를 정리하면 다음과 같습니다.

// 유저 ID	유저가 신고한 ID	정지된 ID
// "muzi"	["frodo", "neo"]	["frodo", "neo"]
// "frodo"	["neo"]	["neo"]
// "apeach"	["muzi", "frodo"]	["frodo"]
// "neo"	없음	없음
// 따라서 "muzi"는 처리 결과 메일을 2회, "frodo"와 "apeach"는 각각 처리 결과 메일을 1회 받게 됩니다.

// 이용자의 ID가 담긴 문자열 배열 id_list, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열 report, 정지 기준이 되는 신고 횟수 k가 매개변수로 주어질 때, 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 2 ≤ id_list의 길이 ≤ 1,000
// 1 ≤ id_list의 원소 길이 ≤ 10
// id_list의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 이루어져 있습니다.
// id_list에는 같은 아이디가 중복해서 들어있지 않습니다.
// 1 ≤ report의 길이 ≤ 200,000
// 3 ≤ report의 원소 길이 ≤ 21
// report의 원소는 "이용자id 신고한id"형태의 문자열입니다.
// 예를 들어 "muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
// id는 알파벳 소문자로만 이루어져 있습니다.
// 이용자id와 신고한id는 공백(스페이스)하나로 구분되어 있습니다.
// 자기 자신을 신고하는 경우는 없습니다.
// 1 ≤ k ≤ 200, k는 자연수입니다.
// return 하는 배열은 id_list에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담으면 됩니다.

// 내가 푼 풀이
function solution(id_list, report, k) {
  var answer = {};
  let newReport = Array.from(new Set(report));
  let reportCount = {};
  let result = {};
  let finalAnswer = [];
  for (let i = 0; i < id_list.length; i++) {
    answer[id_list[i]] = 0;
  }
  for (let i = 0; i < newReport.length; i++) {
    let badman = newReport[i].split(" ")[1];
    reportCount[badman] === undefined
      ? (reportCount[badman] = 1)
      : (reportCount[badman] += 1);
  }
  for (let key in reportCount) {
    if (reportCount[key] >= k) {
      result[key] = reportCount[key];
    }
  }
  for (let key in result) {
    for (let i = 0; i < newReport.length; i++) {
      if (newReport[i].split(" ")[1] === key) {
        answer[newReport[i].split(" ")[0]] += 1;
      }
    }
  }
  for (let key in answer) {
    finalAnswer.push(answer[key]);
  }
  return finalAnswer;
}

// 풀이 1
function solution(id_list, report, k) {
  const reporter = {};
  const users = {};

  const answer = [];

  for (let i = 0; i < report.length; i++) {
    const info = report[i].split(" ");

    // reporter[info[0]]
    // 신고한 사람이 어떤 사람들을 신고했는지를 저장할 수 있는 빈 배열을 생성
    if (!reporter[info[0]]) {
      reporter[info[0]] = [];
    }

    // 신고 당한 사람이 몇번 신고당했는지를 저장할 수 있는 초기값을 생성
    if (!users[info[1]]) {
      users[info[1]] = 0;
    }
    // 중복 신고 방지: 내가 신고한 내역에 해당 유저가 없는 경우에만
    if (!reporter[info[0]].includes(info[1])) {
      // 신고한 사람이 어떤 유저들을 신고했는지 저장
      reporter[info[0]].push(info[1]);
      // 신고 당한 유저의 신고 횟수 카운트
      users[info[1]]++;
    }
    for (let i = 0; i < id_list.length; i++) {
      const reporterList = reporter[id_list[i]] || [];
      answer[i] = 0;

      for (let j = 0; j < reporterList.length; j++) {
        // 해당 유저의 신고횟수가 정지 사유에 부합하는 경우(k번 이상인 경우)
        if (users[reporterList[j]] >= k) {
          answer[i]++;
        }
      }
    }
  }
  return answer;
}

// 풀이 2
function solution(id_list, report, k) {
  const reporter = {}; // 신고한 사람이 어떤 유저들을 신고했는지 저장
  report = [...new Set(report)];
  // 신고당한 사람의 누적 신고량을 저장
  const users = report.reduce((acc, cur) => {
    const info = cur.split(" ");
    // 신고한 사람이 어떤 사람들을 신고했는지를 저장할 수 있는 빈 배열을 생성
    if (!reporter[info[0]]) reporter[info[0]] = [];
    // 신고당한 사람이 몇번 신고당했는지를 저장할 수 있는 초기값을 생성
    if (!acc[info[1]]) acc[info[1]] = 0;

    reporter[info[0]].push(info[1]);
    acc[info[1]]++;
    return acc;
  }, {});

  return id_list.map((id) => {
    const arr = reporter[id] || [];

    return arr.reduce((acc, cur) => {
      console.log(acc, cur, users[cur]);
      return acc + (users[cur] >= k ? 1 : 0);
    }, 0);
  });
}
