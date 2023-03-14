const fruits = ["사과", "바나나", "파인애플"];

//주어진 fruits 배열에서 마지막 요소를 꺼내 newFruits에 넣어주세요.
const newFruits = [];

newFruits.push(fruits[fruits.length - 1]);

//학생들의 이름이 담긴 students 배열이 있습니다. 배열에서 2번 째 요소까지의 데이터들을 뽑아 새로운 배열을 만드세요.
let students = ["철수", "영희", "훈이", "짱구", "유리"];

const newArr = students.slice(0, 2);

//주어진 fruit 배열의 모든 요소에 "맛있는" 이라는 문자열을 추가하세요.
let fruit = ["사과", "바나나"];

for (let i = 0; i < fruit.length; i++) {
  fruit[i] = "맛있는 " + fruit[i];
}

//상수 number는 핸드폰 번호가 담긴 문자열입니다.
//해당 문자열을 "010", "1234", "5678"로 나눈 배열을 만드세요.

const number = "01012345678";

const num1 = number.substring(0, 3);
const num2 = number.substring(3, 7);
const num3 = number.substring(7, 11);

const arr = [num1, num2, num3];

//기존 객체 내 객체 할당하기(중접객체)
//student와 school 두 개의 객체가 존재
const student = {
  name: "철수",
  age: 8,
};

const school = {
  name: "다람쥐초등학교",
  teacher: "다람이",
};

student.school = school;

//객체 내 요소 삭제하기
let student = {
  name: "철수",
  drink: "사이다",
};

delete student.drink;

//객체 내 값 수정
const classmates = [
  {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
  },
  {
    name: "영희",
    age: 8,
    school: "토끼초등학교",
  },
  {
    name: "짱구",
    age: 8,
    school: "다람쥐초등학교",
  },
];

classmates[1].school = " 다람쥐초등학교";
