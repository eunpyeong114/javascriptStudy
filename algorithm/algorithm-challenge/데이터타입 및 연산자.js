//Array.isArray()를 통해 배열인지 확인
let array = [];
let object = {};

typeof array; // object
typeof object; // object
Array.isArray(array); //true
Array.isArray(object); //false

// '-' 연산자는 숫자에서만 정의되기 때문에 모두 숫자로 반환
// '+' 연산자는 더하기와 연결의 의미를 가짐
1 + "1"; // '11'
1 - "1"; // 0
"1" + "1"; // '11'
1 * "1"; // 1
3 * "A"; // NaN
1 + 1 + "1"; // '21'
"1" + 1 + 1; // '111'
"11" - 1; // 10
"11" + 1; // 111
"홍" + "길동"; // "홍길동"
20 === "20"; // false
20 == "20"; // true
!true; //false

// && 와 || 차이
(20 >= 10 &&
  (20 === 10)(
    // false
    20 === 10
  )) ||
  10 === 10; // true
