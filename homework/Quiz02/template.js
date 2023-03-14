import {
  checkEmail,
  checkUserNum,
  checkPhoneNum,
  checkSite,
  getWelcomeTemplate,
} from "./email.js";

function createUser({ name, email, userNum, phoneNum, favoriteSite }) {
  //이메일 검증 (1-"@" 유뮤 2-존재유무)
  const isValidEmail = checkEmail(email);
  if (isValidEmail === false) return;
  //주민번호 검증(1-"-" 유무 2-자릿수 6,7)
  const isValidUserNum = checkUserNum(userNum);
  if (isValidUserNum === false) return;
  //휴대폰번호 검증(10~11자리)
  const isValidPhoneNum = checkPhoneNum(phoneNum);
  if (isValidPhoneNum === false) return;
  //사이트 검증(존재유뮤)
  const isValidSite = checkSite(favoriteSite);
  if (isValidSite === false) return;
  // 템플릿 작성
  getWelcomeTemplate({ name, email, phoneNum, favoriteSite }, isValidUserNum);
}
const profile = {
  name: "코드캠프",
  email: "aaa@aaa.com",
  userNum: "123456-1010101",
  phoneNum: "01022223333",
  favoriteSite: "apple.com",
};

createUser(profile);
