export function checkEmail(email) {
  if (email.includes("@") === false || email === undefined) {
    console.log("입력오류!! 이메일 주소를 다시 한번 확인해 주세요!");
    return false;
  } else {
    return true;
  }
}

export function checkUserNum(userNum) {
  if (
    userNum === undefined ||
    userNum[6] !== "-" ||
    userNum.split("-")[0].length !== 6 ||
    userNum.split("-")[1].length !== 7
  ) {
    console.log("입력오류!! 주민번호를 다시 한번 확인해 주세요!");
    return false;
  } else {
    const backNum = userNum.substring(7, 14);
    userNum = userNum.replace(backNum, "******");
    return userNum;
  }
}

export function checkPhoneNum(phoneNum) {
  if (phoneNum.length < 10 || phoneNum.length > 11) {
    console.log("입력오류!! 휴대폰 번호를 다시 한번 확인해 주세요!");
    return false;
  } else {
    return true;
  }
}

export function checkSite(favoriteSite) {
  if (favoriteSite === undefined) {
    console.log("입력오류!! 좋아하는 사이트를 다시 한번 확인해 주세요!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate(
  { name, email, phoneNum, favoriteSite },
  isValidUserNum
) {
  const myTemplate = `
      <html>
          <body>
          <h1>${name}님 가입을 환영합니다</h1>
          <hr>
          <div>이메일:${email}</div>
          <div>주민번호:${isValidUserNum} </div>
          <div>휴대폰 번호:${phoneNum}</div>
          <div>내가 좋아하는 사이트:${favoriteSite}</div>
          </body>
      </html>
      `;
  console.log(myTemplate);
}
