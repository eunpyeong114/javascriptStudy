function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("에러 발생! 이메일 주소를 제대로 입력해주세요!");
    return false;
  } else {
    return true;
  }
}

function getWelcomeTemplate({ name, age, school, email }) {
  const myTemplate = `
    <html>
        <body>
            <h1>${age}}님 가입을 환영합니다!!!</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>이메일: ${email}</div>
            <div>가입일: ${getToday()}</div>
        </body>
    </html>
`;
  return myTemplate;
}

function sendTemplateToEmail(email, myTemplate) {
  console.log(`${email} 이메일로 가입환영템플릿 ${myTemplate}을 전송합니다`);
}

function createUser({ name, age, school, email }) {
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;
  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ age, name, school, email });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
}

// 버튼 클릭 가정
const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일 ${hours}:${min}:${sec}`;
}

createUser({ name, age, school, email });
