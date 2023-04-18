// 1. 키와 벨류가 다를때
const myName = "철수";
const myAge = 12;
const mySchool = "다람쥐초등학교";
const profile1 = {
  name: myName,
  age: myAge,
  school: mySchool,
};

// 2. 키와 벨류가 같을때
const Name = "철수";
const Age = 12;
const School = "다람쥐초등학교";
// const profile2 = {
//   name:name,
//   age:age,
//   school:school,
// };
const profile2 = { Name, Age, School }; // 키와 벨류가 같아서, 벨류를 생략함 => shorthand property

// 3. shorthand property로 함수에 인자 전달하기
function qqq(aaa) {
  // -> let aaa = profile = {name,age,school} 과 같은 뜻임
  console.log(aaa); // {name:"철수" , age:12 , school:"다람쥐초등학교"}
  console.log(aaa.name); // 철수
  console.log(aaa.age); // 12
  console.log(aaa.school); // 다람쥐초등학교
}
const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
const profile3 = { name, age, school };

qqq(profile3); // 1. profile3이란 변수에 담아서 보내주기
qqq({ name, age, school }); // 2. 그냥 통째로 보내주기
// =>결과는 1번과 2번이 동일
