// 카카오톡 게임별의 하반기 신규 서비스로 다트 게임을 출시하기로 했다. 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임으로, 모두가 간단히 즐길 수 있다.
// 갓 입사한 무지는 코딩 실력을 인정받아 게임의 핵심 부분인 점수 계산 로직을 맡게 되었다. 다트 게임의 점수 계산 로직은 아래와 같다.

// 다트 게임은 총 3번의 기회로 구성된다.
// 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
// 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수1 , 점수2 , 점수3 )으로 계산된다.
// 옵션으로 스타상(*) , 아차상(#)이 존재하며 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(#) 당첨 시 해당 점수는 마이너스된다.
// 스타상(*)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(*)의 점수만 2배가 된다. (예제 4번 참고)
// 스타상(*)의 효과는 다른 스타상(*)의 효과와 중첩될 수 있다. 이 경우 중첩된 스타상(*) 점수는 4배가 된다. (예제 4번 참고)
// 스타상(*)의 효과는 아차상(#)의 효과와 중첩될 수 있다. 이 경우 중첩된 아차상(#)의 점수는 -2배가 된다. (예제 5번 참고)
// Single(S), Double(D), Triple(T)은 점수마다 하나씩 존재한다.
// 스타상(*), 아차상(#)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.
// 0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.

// 입력 형식
// "점수|보너스|[옵션]"으로 이루어진 문자열 3세트.
// 예) 1S2D*3T

// 점수는 0에서 10 사이의 정수이다.
// 보너스는 S, D, T 중 하나이다.
// 옵선은 *이나 # 중 하나이며, 없을 수도 있다.
// 출력 형식
// 3번의 기회에서 얻은 점수 합계에 해당하는 정수값을 출력한다.
// 예) 37
// 보너스를 체크할 수 있는 배열
const isBonus = ["S", "D", "T"];

function solution(dartResult) {
  // 1번째 게임부터 3번째 게임의 결과를 저장
  const answer = [];

  // 점수만 뽑아서 저장
  let score = "";
  for (let i = 0; i < dartResult.length; i++) {
    if (!Number.isNaN(Number(dartResult[i]))) {
      // 숫자 타입으로 변환했을 때 NaN 값이 아닌 경우(= 숫자가 맞는 경우)
      score += dartResult[i];
    } else {
      // 숫자 타입으로 변환했을 때 NaN 값이 맞는 경우(= 숫자가 아닌 경우)
      // 숫자가 아니다 = 보너스 또는 옵션
      if (isBonus.includes(dartResult[i])) {
        // 보너스 처리(S,D,T)
        score = Number(score);
        if (dartResult[i] === "D") {
          // 더블일 경우, 해당 점수에 2제곱
          score = Math.pow(score, 2); // score ** 2
        } else if (dartResult[i] === "T") {
          score = Math.pow(score, 3); // score ** 3
        }
        answer.push(score);
        // 다음 게임의 점수를 받아오기 위해 점수 초기화
        score = "";
      } else {
        // 옵션 처리(*,#)
        if (dartResult[i] === "#") {
          // 아차상일 경우: 현재 게임의 점수를 - 한다.
          answer[answer.length - 1] *= -1;
        } else {
          // 스타상일 경우: 현재 게임의 점수에 2를 곱한다.
          answer[answer.length - 1] *= 2;
          // 현재 게임이 2번째 게임부터 인지를 체크
          if (answer.length > 1) {
            // 이전 게임의 점수를 2배로 만든다.
            answer[answer.length - 2] *= 2;
          }
        }
      }
    }
  }
  return answer.reduce((acc, cur) => acc + cur);
}

// 다른 풀이
// 보너스를 체크할 수 있는 배열
const Bonus = ["S", "D", "T"];

function solution(dartResult) {
  // 점수만 뽑아서 저장
  let score = "";
  // 현재 게임의 연산된 점수를 저장
  let currentScore = 0;
  // 현재 게임이 종료되는 시점을 계산 = 점수를 최종 저장하는 시점
  let end = false;
  return dartResult
    .split("")
    .reduce((acc, cur, i) => {
      if (!Number.isNaN(Number(cur))) {
        // 점수만 뽑아온다.
        score += cur;
        // 새 게임이 시작됐다.
        end = false;
      } else if (isBonus.includes(cur)) {
        // 보너스가 맞는 경우 (S, D, T)
        score = Number(score);
        const squared = isBonus.indexOf(cur) + 1;

        currentScore = score ** squared;
        score = "";

        // 보너스 뒤에 있는 문자열이 숫자가 맞다면 (= 다음 게임의 점수라면)
        if (!Number.isNaN(Number(dartResult[i + 1])) || !dartResult[i + 1]) {
          // 현재 게임은 보너스까지만 있다
          end = true;
        }
      } else {
        // 옵션 처리 (*,#)
        end = true;
        if (cur === "#") {
          // 아차상일 경우, -1을 곱해준다.
          currentScore *= -1;
        } else {
          // 스타상일 경우, 2를 곱해준다.
          currentScore *= 2;

          if (acc.length > 0) {
            // 두번째 게임부터일 경우 체크
            acc[acc.length - 1] *= 2;
          }
        }
      }

      // 점수를 최종적으로 저장
      if (end) {
        // 현재 게임이 완전히 종료되었을 때
        acc.push(currentScore);
      }
      return acc;
    }, [])
    .reduce((acc, cur) => acc + curi);
}
