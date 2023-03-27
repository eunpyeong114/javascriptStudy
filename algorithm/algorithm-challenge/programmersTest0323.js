// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

// 제한사항
// 문자열 s의 길이 : 50 이하의 자연수
// 문자열 s는 알파벳으로만 이루어져 있습니다.

// 내가 푼  풀이
function solution(s) {
  s = s.toLowerCase();
  let idxP = s.indexOf("p");
  let idxY = s.indexOf("y");
  let p = 0;
  let y = 0;
  if (idxP === false || idxY === false) {
    return false;
  } else {
    for (let i = idxP; i < s.length; i++) {
      if (s[i] === "p") {
        p++;
      }
    }
  }
  for (let j = idxY; j < s.length; j++) {
    if (s[j] === "y") {
      y++;
    }
  }
  return p === y ? true : false;
}

// 다른 풀이
function solution(s) {
  let answer = true;

  let p = 0;
  let y = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "p" || s[i] === "P") {
      p++;
    } else if (s[i] === "y" || s[i] === "Y") {
      y++;
    }
  }
  answer = p === y;
  return answer;
}

// 더 간략하게
function solution(s) {
  s = s.toLowerCase();
  const obj = { p: 0, y: 0 };

  for (let i = 0; i < s.length; i++) {
    obj[s[i]];
  }
}

// 풀이.
function solution(s) {
  s = s.toLowerCase(); // 문자열을 소문자로 변환

  const obj = {};
  // let p = 0;
  // let y= 0;

  for (let i = 0; s.length; i++) {
    obj[s[i]] === undefined
      ? (obj[s[i]] = 1) // undefined 일때는 새로 추가
      : obj[s[i]]++; // 있는 데이터라면 하나씩 증가
  }
  return obj.p === obj.y;
}

// 풀이

function solution(s) {
  s = s.toLowerCase(); // 문자열을 소문자로 변환

  const obj = { p: 0, y: 0 };
  s.split("").forEach((str) => {
    // split을 사용하여 문자마다 쪼개고, forEach를 사용하여
    obj[str] === undefined ? (obj[str] = 1) : obj[str]++;
    // 각, 문자마다 undefined일 때는, 새로 키와 값을 객체에 넣고, 아닐 때는 1씩 더한다.
  });
  return obj.p === obj.y;
}

// 문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

// 제한 사항
// 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
// 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

// 풀이 1
function solution(s) {
  let answer = "";

  let idx = 0; // 단어별로 인덱스 값을 저장하는 역할
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      // 공백이라면 그냥 공백을 넣어준다. (예외처리)
      answer += " ";
      idx = 0; // idx 를 0으로 초기화
    } else {
      answer +=
        idx % 2 === 0
          ? // 짝수 인덱스라면 대문자 추가
            s[i].toUpperCase()
          : // 홀수 인덱스라면 소문자 추가
            s[i].toLowerCase();
      idx++;
    }
  }

  return answer;
}
// 풀이 2
function solution(s) {
  // 공백을 기준으로 쪼개서 배열에 저장 (단어를 기준으로)
  const answer = s
    .split(" ")
    .map((word) => {
      return word
        .split("")
        .map((letter, i) => {
          return i % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
        })
        .join("");
      // 하나의 문자열로 (붙어서) 만들어 준다.
    })
    .join(" ");
  // 공백을 기준으로 (띄어서) 문자열을 만들어 준다.
  return answer;
}

//자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

// 제한 조건
// n은 10,000,000,000이하인 자연수입니다.

// 내가 푼 풀이
function solution(n) {
  const answer = [];
  n = [...String(n)];
  for (let i = 0; i < n.length; i++) {
    answer.unshift(Number(n[i]));
  }
  return answer;
}

// 풀이 1
function solution(n) {
  const answer = [];
  // 숫자 타입의 데이터를 문자열 타입으로 변환
  n = String(n);

  // 최초식 : n의 length 값이 5를 가지면, 최초식의 인덱스 값은 4부터
  // 조건식 : 인덱스의 0번째 까지 ( 0번째를 포함 )
  for (let i = n.length - 1; i >= 0; i--) {
    answer.push(Number(n[i]));
  }

  return answer;
}

// 풀이 2
function solution(n) {
  const answer = [];
  // 숫자 타입의 데이터를 문자열 타입으로 변환
  n = String(n);

  for (let i = 0; i < n.length; i++) {
    answer.push(Number(n[i]));
  }
  answer.reverse();

  return answer;
}

// 풀이 3
function solution(n) {
  const answer = [];
  // 숫자 타입의 데이터를 문자열 타입으로 변환
  n = String(n);

  for (let i = 0; i < n.length; i++) {
    answer.push(Number(n[i]));
  }
  answer.reverse();

  return answer;
}

// array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
// divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

// 제한사항
// arr은 자연수를 담은 배열입니다.
// 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
// divisor는 자연수입니다.
// array는 길이 1 이상인 배열입니다.

// 내가 푼 풀이
function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i]);
    }
  }
  if (answer.length === 0) {
    return [-1];
  } else {
    return answer.sort((a, b) => a - b);
  }
}

// 풀이 1
function solution(arr, divisor) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i]);
    }
  }

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

// 풀이 2
function solution(arr, divisor) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i]);
    }
  }

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}
