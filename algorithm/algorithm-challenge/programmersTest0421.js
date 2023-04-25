// 내가 시도중인 풀이
const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["*", 0, "#"],
];

function solution(numbers, hand) {
  for (let i = 0; i < numbers.length; i++) {
    keypad.map((el, l) => {
      if (el.includes(numbers[i])) {
        el.map((el2, j) => {
          if (el2 === numbers[i]) {
            console.log(l, j);
          }
        });
      }
    });
  }
}
// 풀이
const leftNumbers = [1, 4, 7]; // 왼쪽 엄지손가락을 이용해 눌러야 할 키패드들
const rightNumbers = [3, 6, 9]; // 오른쪽 엄지손가락을 이용해 눌러야 할 키패드들

function solution(numbers, hand) {
  let answer = "";

  // 현재 손가락의 위치 (왼쪽 손가락,오른쪽 손가락) = 어떤 키패드에 위치하고 있는지
  const current = {
    left: 10, // *에 해당하는 위치값
    right: 12, // #에 해당하는 위치값
  };
  for (let i = 0; i < numbers.length; i++) {
    if (leftNumbers.includes(numbers[i])) {
      //  누를 번호가 왼쪽 키패드에 해당하는 경우 = 왼쪽 손가락을 이용해 누른다.
      answer += "L";
      current.left = numbers[i]; // 왼손 엄지손가락 이동
    } else if (rightNumbers.includes(numbers[i])) {
      // 누를 번호가 오른쪽 키패드에 해당하는 경우 = 오른쪽 손가락을 이용해 누른다
      answer += "R";
      current.right = numbers[i]; // 오른손 엄지손가락 이동
    } else {
      // 가운데 키패드를 누를 경우
      const locationObj = { ...current }; // 양쪽의 손가락의 위치를 계산
      for (let hand in locationObj) {
        // 0번 키패드의 경우 0번 키패드에 해당하는 위치값(11)로 환산
        (numbers[i] === numbers[i]) === 0 ? 11 : numbers[i];

        // 가운데 키패드로부터 양쪽의 손가락이 몇칸 떨어져있는지를 계산
        let location = Math.abs(numbers[i] - locationObj[hand]);

        // 왼쪽이나 오른쪽으로 3칸 이상 이동했을 경우
        if (location >= 3) {
          location = Math.floor(location / 3) + (location % 3);
        }
        locationObj[hand] = location;
      }
      // 가운데 키패드의 번호로부터 양쪽의 손가락의 위치가 서로 동일하다면
      // 주로 사용하는 손가락(hand)을 이용해서 눌러준다.
      if (locationObj.left === locationObj.right) {
        answer += hand === "left" ? "L" : "R";
        current[hand] = numbers[i];
      }
      // 두손가락의 위치가 서로 동일하지 않은 경우
      // 더 가까운 손가락을 이용해서 누른다.
      else {
        // 오른쪽 손가락이 더 가까운 경우 = 오른쪽 손가락으로 누른다.
        if (locationObj.left > locationObj.right) {
          answer += "R";
          current.right = numbers[i];
        }
        // 왼쪽 손가락이 더 가까운 경우 = 왼쪽 손가락으로 누른다
        else {
          answer += "L";
          current.left = numbers[i];
        }
      }
    }
  }
  return answer;
}

// 3진수로 바꾸는 법 - 1
// let answer = '';
// let num = 10;

// while(num>0){
//   answer = (num % 3) + answer
//   num = Math.floor(num / 3)
// }

// num = 10;
// // String(num)
// num.toString()
// 10..toString()
// .5===0.5
// 10..toString()

// 객체를 이중배열(배열 내 배열)로 만드는 법
// Object.entries()

// 소수를 정수로 변환해주는 메서드 => 소수점 제거
// math.trunc
