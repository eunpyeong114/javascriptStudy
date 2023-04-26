// 문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요.
// 예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

// 제한 조건
// s에는 둘 이상의 정수가 공백으로 구분되어 있습니다.

// 내 풀이
function solution(s) {
  const result = [];
  let answer = "";
  s = s.split(" ");
  for (let i = 0; i < s.length; i++) {
    result.push(Number(s[i]));
  }
  result.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  answer += `${result[0]} ${result[result.length - 1]}`;
  return answer;
}

// 다른 풀이
function solution(s) {
  s += " "; // 마지막 숫자를 가져오기 위해 공백을 임의로 추가한다.
  let [min, max] = [0, 0];

  let str = ""; // 한 자릿수가 아니라 두 자릿수 이상의 숫자를 저장하기 위한 문자열
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      // 현재 가져올 숫자의 계산이 끝나는 시점(= 여러 자릿수의 숫자를 가져온 상태)
      str = Number(str);

      if (min === 0 || max === 0) {
        // 기준점 구하기(가장 먼저 가져오는 숫자가 다음 숫자들의 비교대상이 된다)
        [min, max] = [str, str];
      } else {
        // 두번째 숫자부터 가져올 경우
        min = Math.min(str, min);
        max = Math.max(str, max);
      }
      str = "";
    }
    str += s[i];
  }
  return `${min} ${max}`;
}

// 다른 풀이 // 스프레드 연산자를 이용하면 문자열로 된 숫자는 숫자로 자동 변환되는 듯!!!!!!!!
function solution(s) {
  s = s.split(" ");
  const min = Math.min(...s);
  const max = Math.max(...s);
  return `${min} ${max}`;
}

// 프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

// 또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

// 먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

// 제한 사항
// 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
// 작업 진도는 100 미만의 자연수입니다.
// 작업 속도는 100 이하의 자연수입니다.
// 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

// 입출력 예
// progresses	speeds	return
// [93, 30, 55]	[1, 30, 5]	[2, 1]
// [95, 90, 99, 99, 80, 99]	[1, 1, 1, 1, 1, 1]	[1, 3, 2]
// 입출력 예 설명
// 입출력 예 #1
// 첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
// 두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
// 세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.

// 따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

// 입출력 예 #2
// 모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.

// 따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.

// 내 풀이
function solution(progresses, speeds) {
  var answer = [];
  const days = [];
  for (let i = 0; i < progresses.length; i++) {
    days.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }
  let count = 0;
  let open = days[0];
  for (let i = 0; i < days.length; i++) {
    count++;
    if (open < days[i + 1]) {
      answer.push(count);
      open = days[i + 1];
      count = 0;
    } else if (!days[i + 1]) {
      answer.push(count);
    }
  }
  return answer;
}

// 다른 풀이
function solution(progresses, speeds) {
  const answer = [];
  // 앞에 있는 작업이 몇일이 걸리는지를 저장
  let day = 0;

  for (let i = 0; i < progresses.length; i++) {
    // 100% 까지 몇일이 걸리는지
    const deadline = Math.ceil((100 - progresses[i]) / speeds[i]);
    if (deadline > day) {
      day = deadline;
      // 앞에 있는 작업이 배포되는 시점
      answer.push(1);
    } else if (day >= deadline) {
      // 개발이 완료되었지만, 앞에 있는 작업이 끝날 때까지를 기다려야 할 때
      answer[answer.length - 1]++;
    }
  }
  return answer;
}

// 다른 풀이
function solution(progresses, speeds) {
  // 앞에 있는 작업이 몇일이 걸리는지를 저장
  let day = 0;

  return progresses.reduce((acc, cur, i) => {
    const deadline = Math.ceil((100 - cur) / speeds[i]);
    if (deadline > day) {
      day = deadline;
      acc.push(1);
    } else if (deadline <= day) {
      acc[acc.length - 1]++;
    }
    return acc;
  }, []);
}
