function checkRight(resident) {
  if (resident.includes("-") === false || resident.indexOf("-") !== 6) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else {
    return true;
  }
}

function checkNumber(resident) {
  const result = resident.split("-");
  if (result[0].length !== 6 || result[1].length !== 7) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

function sendToken(resident) {
  const qqq = resident.substring(0, resident.length - 6) + "******";
  return qqq;
}

function customRegistrationNumber(resident) {
  // 1. 주민번호 가운데가 ”-”로 구성되어 있는지 확인
  const isValid = checkRight(resident);
  if (isValid === false) return;
  // 2. 주민번호가 앞 6자리, 뒤 7자리로 구성되어 있는지 확인
  const isNumber = checkNumber(resident);
  if (isNumber === false) return;
  // 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력
  return sendToken(resident);
}

function getTemplate({ name, email, resident, phone, likeSite }) {
  const number = customRegistrationNumber(resident);
  const mytemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다.</h1>
                  <hr />
                  <div>이메일: ${email}</div>
                  <div>주민번호: ${number}</div>
                  <div>휴대폰 번호: ${phone}</div>
                  <div>내가 좋아하는 사이트: ${likeSite}</div>
              </body>
          </html>
      `;
  console.log(mytemplate);
}

const name = "코드캠프";
const email = "aaa@aaa.com";
const resident = "123456-2000000";
const phone = "01022223333";
const likeSite = "apple.com";

getTemplate({ name, email, resident, phone, likeSite });
