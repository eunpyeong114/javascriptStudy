// 다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.

// (), [], {} 는 모두 올바른 괄호 문자열입니다.
// 만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다. 예를 들어, [] 가 올바른 괄호 문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
// 만약 A, B가 올바른 괄호 문자열이라면, AB 도 올바른 괄호 문자열입니다. 예를 들어, {} 와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.
// 대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 이 s를 왼쪽으로 x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// s의 길이는 1 이상 1,000 이하입니다.
// 입출력 예
// s	result
// "[](){}"	3
// "}]()[{"	2
// "[)(]"	0
// "}}}"	0
// 입출력 예 설명
// 입출력 예 #1

// 다음 표는 "[](){}" 를 회전시킨 모습을 나타낸 것입니다.
// x	s를 왼쪽으로 x칸만큼 회전	올바른 괄호 문자열?
// 0	"[](){}"	O
// 1	"](){}["	X
// 2	"(){}[]"	O
// 3	"){}[]("	X
// 4	"{}[]()"	O
// 5	"}[](){"	X
// 올바른 괄호 문자열이 되는 x가 3개이므로, 3을 return 해야 합니다.
// 입출력 예 #2

// 다음 표는 "}]()[{" 를 회전시킨 모습을 나타낸 것입니다.
// x	s를 왼쪽으로 x칸만큼 회전	올바른 괄호 문자열?
// 0	"}]()[{"	X
// 1	"]()[{}"	X
// 2	"()[{}]"	O
// 3	")[{}]("	X
// 4	"[{}]()"	O
// 5	"{}]()["	X
// 올바른 괄호 문자열이 되는 x가 2개이므로, 2를 return 해야 합니다.
// 입출력 예 #3

// s를 어떻게 회전하더라도 올바른 괄호 문자열을 만들 수 없으므로, 0을 return 해야 합니다.
// 입출력 예 #4

// s를 어떻게 회전하더라도 올바른 괄호 문자열을 만들 수 없으므로, 0을 return 해야 합니다.

// 내 풀이 (테스트 케이스 2개 통과 못함)
const bracket = { "(": 1, ")": -1, "{": 3, "}": -3, "[": 5, "]": -5 };
function solution(s) {
  let answer = 0;
  let sum = 0;
  let result = false;
  s = s.split("");
  for (let i = 0; i < s.length; i++) {
    if (result) {
      answer++;
    }
    sum = 0;

    for (let j = 0; j < s.length; j++) {
      sum += bracket[s[j]];
      if (sum === 0 || sum % 2 === 1) {
        result = true;
      } else if (sum < 0) {
        result = false;
        break;
      }
    }
    s.push(s.shift());
  }

  return answer;
}

// 얘도 마찬가지로 하나 통과 못함
function solution(s) {
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    // 왼쪽으로 한칸씩 밀기
    s = s.slice(1) + s[0];

    const list = { large: 0, middle: 0, small: 0 };

    for (let j = 0; j < s.length; j++) {
      if (s[j] === "]") list.large--;
      if (s[j] === "}") list.middle--;
      if (s[j] === ")") list.small--;

      if (s[j] === "[") list.large++;
      if (s[j] === "{") list.middle++;
      if (s[j] === "(") list.small++;
      if (list.large === -1 || list.middle === -1 || list.small === -1) {
        break;
      }
      if (j === s.length - 1) {
        if (list.large === 0 && list.middle === 0 && list.small === 0) {
          answer++;
        }
      }
    }
  }
}

// 정답!! 풀이 로직 기억해두면 좋을 듯
const numbering = {
  "[": 0,
  "]": 1,
  "{": 2,
  "}": 3,
  "(": 4,
  ")": 5,
};

function solution(s) {
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    const stack = [];
    s = s.slice(1) + s[0];
    for (let j = 0; j < s.length; j++) {
      // 열린 괄호인지, 닫힌 괄호인지 판단(열림:짝수,닫힘:홀수)
      if (numbering[s[j]] % 2 === 0) {
        // 열린 괄호만 찾아온다.
        stack.push(numbering[s[j]]);
        // 숫자로 넣는다.
      } else {
        // 닫힌 괄호라면, stack에 그 짝이 있는지 체크
        if (stack.includes(numbering[s[j]] - 1)) {
          const last = stack[stack.length - 1];
          if (last === numbering[s[j]] - 1) {
            stack.splice(stack.length - 1, 1);
          }
        } else {
          break;
        }
      }
      if (j === s.length - 1) {
        if (stack.length === 0) {
          answer++;
        }
      }
    }
  }
  return answer;
}

// 압축
// 신입사원 어피치는 카카오톡으로 전송되는 메시지를 압축하여 전송 효율을 높이는 업무를 맡게 되었다. 메시지를 압축하더라도 전달되는 정보가 바뀌어서는 안 되므로, 압축 전의 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘을 구현하기로 했다.

// 어피치는 여러 압축 알고리즘 중에서 성능이 좋고 구현이 간단한 LZW(Lempel–Ziv–Welch) 압축을 구현하기로 했다. LZW 압축은 1983년 발표된 알고리즘으로, 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용되었다.

// LZW 압축은 다음 과정을 거친다.

// 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
// 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
// w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
// 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
// 단계 2로 돌아간다.
// 압축 알고리즘이 영문 대문자만 처리한다고 할 때, 사전은 다음과 같이 초기화된다. 사전의 색인 번호는 정수값으로 주어지며, 1부터 시작한다고 하자.

// 색인 번호	1	2	3	...	24	25	26
// 단어	A	B	C	...	X	Y	Z
// 예를 들어 입력으로 KAKAO가 들어온다고 하자.

// 현재 사전에는 KAKAO의 첫 글자 K는 등록되어 있으나, 두 번째 글자까지인 KA는 없으므로, 첫 글자 K에 해당하는 색인 번호 11을 출력하고, 다음 글자인 A를 포함한 KA를 사전에 27 번째로 등록한다.
// 두 번째 글자 A는 사전에 있으나, 세 번째 글자까지인 AK는 사전에 없으므로, A의 색인 번호 1을 출력하고, AK를 사전에 28 번째로 등록한다.
// 세 번째 글자에서 시작하는 KA가 사전에 있으므로, KA에 해당하는 색인 번호 27을 출력하고, 다음 글자 O를 포함한 KAO를 29 번째로 등록한다.
// 마지막으로 처리되지 않은 글자 O에 해당하는 색인 번호 15를 출력한다.
// 현재 입력(w)	다음 글자(c)	출력	사전 추가(w+c)
// K	A	11	27: KA
// A	K	1	28: AK
// KA	O	27	29: KAO
// O		15
// 이 과정을 거쳐 다섯 글자의 문장 KAKAO가 4개의 색인 번호 [11, 1, 27, 15]로 압축된다.

// 입력으로 TOBEORNOTTOBEORTOBEORNOT가 들어오면 다음과 같이 압축이 진행된다.

// 현재 입력(w)	다음 글자(c)	출력	사전 추가(w+c)
// T	O	20	27: TO
// O	B	15	28: OB
// B	E	2	29: BE
// E	O	5	30: EO
// O	R	15	31: OR
// R	N	18	32: RN
// N	O	14	33: NO
// O	T	15	34: OT
// T	T	20	35: TT
// TO	B	27	36: TOB
// BE	O	29	37: BEO
// OR	T	31	38: ORT
// TOB	E	36	39: TOBE
// EO	R	30	40: EOR
// RN	O	32	41: RNO
// OT		34
// 입력 형식
// 입력으로 영문 대문자로만 이뤄진 문자열 msg가 주어진다. msg의 길이는 1 글자 이상, 1000 글자 이하이다.

// 출력 형식
// 주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.

// 입출력 예제
// msg	answer
// KAKAO	[11, 1, 27, 15]
// TOBEORNOTTOBEORTOBEORNOT	[20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
// ABABABABABABABAB	[1, 2, 27, 29, 28, 31, 30]

function solution(msg) {
  // 글자들의 색인 번호를 지정하기 위한 객체
  const dictionary = {};
  let index = 1;
  for (let i = 65; i <= 90; i++) {
    dictionary[String.fromCharCode(i)] = index;
    index++;
  }
  const answer = [];
  let str = ""; // 여러개의 글자를 담기 위한 변수
  for (let i = 0; i < msg.length; i++) {
    str += msg[i];
    const next = str + msg[i + 1];
    if (dictionary[next] === undefined) {
      // 만약 바로 뒤의 한 글자까지 포함한 문자가 색인 번호가 없다면,
      if (msg[i + 1] !== undefined) {
        dictionary[next] = index;
      }
      index++;

      answer.push(dictionary[str]);
      str = "";
    }
  }
  return answer;
}
