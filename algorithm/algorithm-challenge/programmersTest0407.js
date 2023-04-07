// 당신은 폰켓몬을 잡기 위한 오랜 여행 끝에, 홍 박사님의 연구실에 도착했습니다. 홍 박사님은 당신에게 자신의 연구실에 있는 총 N 마리의 폰켓몬 중에서 N/2마리를 가져가도 좋다고 했습니다.
// 홍 박사님 연구실의 폰켓몬은 종류에 따라 번호를 붙여 구분합니다. 따라서 같은 종류의 폰켓몬은 같은 번호를 가지고 있습니다. 예를 들어 연구실에 총 4마리의 폰켓몬이 있고, 각 폰켓몬의 종류 번호가 [3번, 1번, 2번, 3번]이라면 이는 3번 폰켓몬 두 마리, 1번 폰켓몬 한 마리, 2번 폰켓몬 한 마리가 있음을 나타냅니다. 이때, 4마리의 폰켓몬 중 2마리를 고르는 방법은 다음과 같이 6가지가 있습니다.

// 첫 번째(3번), 두 번째(1번) 폰켓몬을 선택
// 첫 번째(3번), 세 번째(2번) 폰켓몬을 선택
// 첫 번째(3번), 네 번째(3번) 폰켓몬을 선택
// 두 번째(1번), 세 번째(2번) 폰켓몬을 선택
// 두 번째(1번), 네 번째(3번) 폰켓몬을 선택
// 세 번째(2번), 네 번째(3번) 폰켓몬을 선택
// 이때, 첫 번째(3번) 폰켓몬과 네 번째(3번) 폰켓몬을 선택하는 방법은 한 종류(3번 폰켓몬 두 마리)의 폰켓몬만 가질 수 있지만, 다른 방법들은 모두 두 종류의 폰켓몬을 가질 수 있습니다. 따라서 위 예시에서 가질 수 있는 폰켓몬 종류 수의 최댓값은 2가 됩니다.
// 당신은 최대한 다양한 종류의 폰켓몬을 가지길 원하기 때문에, 최대한 많은 종류의 폰켓몬을 포함해서 N/2마리를 선택하려 합니다. N마리 폰켓몬의 종류 번호가 담긴 배열 nums가 매개변수로 주어질 때, N/2마리의 폰켓몬을 선택하는 방법 중, 가장 많은 종류의 폰켓몬을 선택하는 방법을 찾아, 그때의 폰켓몬 종류 번호의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// nums는 폰켓몬의 종류 번호가 담긴 1차원 배열입니다.
// nums의 길이(N)는 1 이상 10,000 이하의 자연수이며, 항상 짝수로 주어집니다.
// 폰켓몬의 종류 번호는 1 이상 200,000 이하의 자연수로 나타냅니다.
// 가장 많은 종류의 폰켓몬을 선택하는 방법이 여러 가지인 경우에도, 선택할 수 있는 폰켓몬 종류 개수의 최댓값 하나만 return 하면 됩니다.

// 내 풀이
function solution(nums) {
  let number = new Set(nums);
  const unique = number.size;
  if (unique >= nums.length / 2) {
    return nums.length / 2;
  } else {
    return unique;
  }
}

// 다른 풀이
function solution(nums) {
  const answer = [];

  for (let i = 0; i < nums.length; i++) {
    if (
      answer.includes(nums[i]) === false &&
      nums.length / 2 !== answer.length
    ) {
      answer.push(nums[i]);
    }
  }
  return answer.length;
}

// 다른 풀이
function solution(nums) {
  const answer = new Set([]);
  for (let i = 0; i < nums.length; i++) {
    if (nums.length / 2 !== answer.size) {
      answer.add(nums[i]);
    }
  }
  return answer.size;
}

// 매서드를 활용한 풀이
function solution(nums) {
  const answer = [];
  nums.forEach((monster) => {
    if (!answer.includes(monster) && nums.length / 2 !== answer.length) {
      answer.push(monster);
    }
  });
  return answer.length;
}

// 나와 유사한 풀이
function solution(nums) {
  const answer = new Set(nums).size;
  const limit = nums.length / 2;
  if (limit >= answer) {
    return answer;
  } else {
    return limit;
  }
}

/*
    세 수 정렬
    
    숫자 세 개가 담겨있는 배열 arr이 주어졌을 때, 
    가장 작은 수, 그 다음 수, 가장 큰 수로 오름차순 정렬한 배열을 리턴하세요.
    단) 배열에 담긴 숫자는 1보다 크거나 같고, 1,000,000보다 작거나 같다. 이 숫자는 모두 다르다.

    - (1 <= arr[i] <= 1,000,000)
    - arr의 요소 중 중복 요소는 존재하지 않습니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      sortNum([ 2, 3, 1 ])

    case2:
      sortNum([ 400, 501, 23 ])

    ------------------------------
    output
    ------------------------------

    case1:
      [ 1, 2, 3 ]

    case2:
      [ 23, 400, 501 ]
*/
// 내가 푼 풀이
function sortNum(arr) {
  // 여기에서 작업하세요.
  return arr.sort((a, b) => a - b);
}

/*
    짧은 단어 찾기

    다양한 속성의 요소가 담긴 배열이 주어집니다.
    배열 내의 요소 중에서 가장 짧은 문자열을 찾아 리턴해야합니다.

    - 요소의 타입은 String이 아닐 수도 있습니다.
    - String 타입만을 비교해야합니다.
    - String 타입을 리턴해야합니다.
    - 주어진 배열 내에 문자열 타입 데이터가 존재하지 않는다면, 빈 문자열을 리턴해야합니다.
    
    입출력 예시
    ------------------------------
    input
    ------------------------------

    [ [1], 'codecamp', true, 'code' ]

    ------------------------------
    output
    ------------------------------

    'code'

*/
// 내가 푼 풀이
function shortestWord(arr) {
  // 여기에서 작업하세요.
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "string") {
      newArr.push(arr[i]);
    }
  }
  if (newArr.length === 0) {
    return " ";
  }

  let answer = newArr[0];
  for (let i = 0; i < newArr.length - 1; i++) {
    if (answer.length >= newArr[i + 1].length) {
      answer = newArr[i + 1];
    }
  }
  return answer;
}
// 다른 풀이
function shortestWord(arr) {
  // 여기에서 작업하세요.
  const strArr = arr.filter((e) => {
    return typeof e === "string";
  });

  let answer = strArr[0];

  for (let i = 1; i < strArr.length; i++) {
    if (answer.length > strArr[i].length) {
      answer = strArr[i];
    }
  }

  return answer;
}

// 다른 풀이
function shortestWord(arr) {
  // 여기에서 작업하세요.
  return arr.reduce((a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.length <= b.length ? a : b;
    } else if (typeof a === "string") {
      return a;
    }
    return b;
  });
}

/*
    문자열 패턴

    문자열 pattern과 str이 주어집니다.
    두 문자열이 입력된 패턴이 완전히 같은지 확인한 뒤,
    같은 패턴일 경우 true를,
    패턴이 다를 경우 false를 리턴해주세요.

    - 문자열 pattern은 공백이 존재하지 않습니다.
    - 문자열 str은 단어 사이에 공백이 존재합니다.
    - pattern과 str 내 단어가 반복되는 횟수까지도 같아야 완전히 같은 패턴입니다.

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      const pattern = 'abba'
      const str = 'dog cat cat dog'
      stringPattern(pattern, str)

    case2:
      const pattern = 'abcaba';
      const str = 'cup ice coffee cup ice coffee';
      stringPattern(pattern, str)

    case3:
      const pattern = 'abbab';
      const str = 'a b b a b a b b a b';
      stringPattern(pattern, str)

    ------------------------------
    output
    ------------------------------

    case1:
      true

    case2:
      false
      
    case3:
      false
*/

// 내가 푼 풀이
function stringPattern(pattern, str) {
  // 여기에서 작업하세요.
  const setPattern = [...new Set(pattern)];
  const arrStr = str.split(" ");
  const setStr = [...new Set(arrStr)];
  let answer;
  const diff = {};
  if (pattern.length !== arrStr.length) {
    return (answer = false);
  } else {
    for (let i = 0; i < setPattern.length; i++) {
      const a = setPattern[i];
      const b = setStr[i];
      diff[a] = b;
    }
  }

  const result = [];
  for (let i = 0; i < pattern.length; i++) {
    result.push(diff[pattern[i]]);
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== arrStr[i]) {
      return (answer = false);
    } else {
      answer = true;
    }
  }
  return answer;
}

// 다른 풀이
function stringPattern(pattern, str) {
  // 여기에서 작업하세요.
  str = str.split(" ");
  if (pattern.length !== str.length) return false;
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[pattern[i]] === undefined) obj[pattern[i]] = str[i];
    else if (obj[pattern[i]] !== str[i]) return false;
  }
  return true;
}

// 다른 풀이
function stringPattern(pattern, str) {
  // 여기에서 작업하세요.
  if (pattern.length !== str.length) return false;
  str = str.split(" ");

  let answer = true;
  const hashed = {};

  str.forEach((el, i) => {
    if (hashed[el] === undefined) hashed[el] = pattern[i];
    else if (hashed[el] !== pattern[i]) answer = false;
  });

  return answer;
}

/*
    거스름돈

    현금만을 사용하는 매점의 점원인 당신은
    현재 매장에 동전 밖에 남지 않은 것을 확인했습니다.
    손님들이 몰려오고 있고, 당신은 각각의 손님에게 최소 개수의 동전만을 사용해 거스름돈을 전달해야합니다.

    현재 가지고 있는 동전은 1원, 5원, 10원, 50원, 100원, 500원,
    이상 여섯개 종류가 있습니다.
    인자로 받는 change는 거슬러주어야 하는 액수입니다.
    최소 개수의 동전을 사용해 주어진 change와 같은 값을 만들고
    사용된 동전의 개수를 리턴해주세요.

    예를 들어 change가 4600원이라면,
    500원짜리 9개, 100원짜리 1개, 최소 10개로 완성되기 때문에
    숫자 10을 리턴합니다.

    - number 타입을 리턴해야합니다.
    - change는 1이상 1000000 이하의 정수입니다. (1 <= change <= 1000000)

    입출력 예시
    ------------------------------
    input
    ------------------------------

    case1:
      makeChange(4350)

    case2:
      makeChange(2000)

    ------------------------------
    output
    ------------------------------

    case1:
      12

    case2:
      4
    
*/
// 내가 푼 풀이
function makeChange(change) {
  // 여기에서 작업하세요.
  let count = 0;
  const first = Math.floor(change / 500);
  count += first;
  change -= first * 500;

  const second = Math.floor(change / 100);
  count += second;
  change -= second * 100;

  const third = Math.floor(change / 50);
  count += third;
  change -= third * 50;

  const fourth = Math.floor(change / 10);
  count += fourth;
  change -= fourth * 10;

  const fifth = Math.floor(change / 5);
  count += fifth;
  change -= fifth * 5;

  const sixth = Math.floor(change / 1);
  count += sixth;
  change -= sixth * 1;

  return count;
}

// 다른 풀이
function makeChange(change) {
  let result = 0;
  const coins = [500, 100, 50, 10, 5, 1];

  coins.forEach((e) => {
    if (change > 0) {
      const coin = Math.floor(change / e);
      change -= e * coin;
      result += coin;
    }
  });

  return result;
}

// 다른 풀이
function makeChange(change) {
  let i = 0;
  let countCoin = 0;
  const coin = [500, 100, 50, 10, 5, 1];

  while (change !== 0) {
    const rest = change / coin[i];

    const quotient = Math.floor(rest);
    countCoin += quotient;
    change -= coin[i] * quotient;

    i++;
  }

  return countCoin;
}
