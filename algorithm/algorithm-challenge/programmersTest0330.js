// 길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.

// 이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1] 입니다. (n은 a, b의 길이)

// 제한사항
// a, b의 길이는 1 이상 1,000 이하입니다.
// a, b의 모든 수는 -1,000 이상 1,000 이하입니다.

// 내가 푼 풀이
function solution(a, b) {
  let answer = 0;
  for (let i = 0; i < a.length; i++) {
    answer += a[i] * b[i];
  }
  return answer;
}

// 매서드 활용한 풀이
function solution(a, b) {
  const answer = a.reduce((acc, cur, i) => {
    return acc + cur * b[i];
  }, 0);
  console.log(answer);
}

// 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

// 제한 조건
// 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.

// 내가 푼 풀이
function solution(arr1, arr2) {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    let answer = [];
    for (let j = 0; j < arr1[i].length; j++) {
      answer.push(arr1[i][j] + arr2[i][j]);
    }
    result[i] = answer;
  }
  return result;
}

// 다른 풀이
function solution(arr1, arr2) {
  const answer = [[]];
  // 1. arr1 배열의 전체 배열 요소들을 가져온다.
  for (let i = 0; i < arr1.length; i++) {
    //   2. arr1 배열에서 가져온 배열들의 요소를 참조
    for (let j = 0; j < arr1[i].length; j++) {
      //     3. i와 j 인덱스를 활용해 sum이라는 상수에 합을 저장
      const sum = arr1[i][j] + arr2[i][j];
      //     4. i번째 행에 배열이 없다면 빈 배열을 생성
      if (answer[i] === undefined) {
        answer[i] = [];
      }
      //     5. i와 j인덱스를 활용해서 answer의 해당 행, 열에 데이터를 직접 삽입
      answer[i][j] = sum;
    }
  }
  return answer;
}

//매서드 활용한 풀이
function solution(arr1, arr2) {
  const answer = arr1.map((numArr, i) => {
    return numArr.map((num, j) => {
      return num + arr2[i][j];
    });
  });
  return answer;
}
