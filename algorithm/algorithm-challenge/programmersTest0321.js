// 1
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 제한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.
function solution(s) {
  var answer = s[center];
  let center = Math.floor(s.length / 2);
  if (s.length % 2 === 0) {
    answer = s[center - 1] + s[center];
  }
  return answer;
}

// 또 다른 풀이
function solution(s) {
  const center = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[center] : s.slice(center - 1, center + 1);
}

// 2
// String형 배열 seoul의 element중 "Kim"의 위치 x를 찾아, "김서방은 x에 있다"는 String을 반환하는 함수, solution을 완성하세요. seoul에 "Kim"은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

// 제한 사항
// seoul은 길이 1 이상, 1000 이하인 배열입니다.
// seoul의 원소는 길이 1 이상, 20 이하인 문자열입니다.
// "Kim"은 반드시 seoul 안에 포함되어 있습니다.

function solution(seoul) {
  var answer = "";
  let location = seoul.indexOf("Kim");
  answer = `김서방은 ${location}에 있다`;
  return answer;
}

// 간결하게 풀이
function solution(seoul) {
  const x = seoul.indexOf("Kim");
  return `김서방은 ${x}에 있다`;
}

// 문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.
// s는 영문 알파벳 대소문자 또는 0부터 9까지 숫자로 이루어져 있습니다.

// 내가 푼 풀이 / '3e10'과 같은 문자는 걸러주지 못함!!!!! 3e10도 일종의 숫자임, 16진수...?
function solution(s) {
  const x = isNaN(s);
  if (s.length !== 4 && s.length !== 6) {
    return false;
  } else if (x) {
    return false;
  } else {
    return true;
  }
}

// 정답
function solution(s) {
  let answer = true;
  if (s.length !== 4 && s.length !== 6) {
    answer = false;
  }
  for (let i = 0; i < s.length; i++) {
    if (isNaN(s[i])) {
      answer = false;
    }
  }
  return answer;
}

// 매서드를 활용한 방법
function solution(s) {
  if (s.length !== 4 && s.length !== 6) {
    return false;
  }

  const answer = s.split("").filter((num) => {
    // if(inNaN(num)===false){
    //   return true
    // }
    return isNaN(num) === false; /// 숫자값만 걸러서 출력 됨
  });

  return s.length === answer.length;
}

// 정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

// 제한 사항
// n은 0 이상 3000이하인 정수입니다.

// 내가 푼 풀이
function solution(n) {
  var answer = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      answer += i;
    }
  }
  return answer;
}

// 조금 더 단축 풀이
function solution(n) {
  let answer = n;
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) {
      answer += i;
    }
  }
  return answer;
}

// 매서드 활용 풀이
function solution(n) {
  return new Array(n).fill(1).reduce((acc, cur, i) => {
    const num = cur + i; //i 는 cur의 인덱스 번호
    return acc + (n % num === 0 ? num : 0);
  }, 0);
}
