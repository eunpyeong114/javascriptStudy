// 1. 구조분해할당 예제
const profile1 = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
};

const { name, age, school } = profile1;
console.log(name, age, school);

// 2. 객체 전달하기
function qqq(aaa) {
  // let aaa = profile2
  console.log(aaa); //profile2 객체
  console.log(aaa.name); //철수
  console.log(aaa.age); //12
  console.log(aaa.school); //다람쥐초등학교
}
const profile2 = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
};
qqq(profile2);

// 3. 객체 전달하기 => 구조분해할당 방식으로 전달하기
function qqq({ name, age, school }) {
  // let { name, age, school } = profile3
  console.log(name); // 철수
  console.log(age); // 12
  console.log(school); // 다람쥐초등학교
}
const profile3 = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
};
qqq(profile3);
