// 매개변수 및 전달인자에 중괄호를 붙임으로써 안전한 코드로 만들기
function getWelcomeTemplate({ name, age, school, createdAt }) {
  // 객체의 구조분해할당한 것이기 때문에 매개변수의 위치는 중요치 않다!
  const myTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `;
  console.log(myTemplate);
}

const name = "훈이";
const age = 8;
const school = "다람쥐초등학교";
const createdAt = "2020-10-10";

getWelcomeTemplate({ name, age, school, createdAt });
// shorthand property 방법으로 처리한 것
// const profile ={
//     name,age,school,createdAt
// }
