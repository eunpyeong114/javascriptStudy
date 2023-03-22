import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;
import "dotenv/config";
const SMS_KEY = process.env.SMS_KEY;
const SMS_SECRET = process.env.SMS_SECRET;
const SMS_SENDER = process.env.SMS_SENDER;

export function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생! 휴대폰 번호를 제대로 입력해 주세요!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export async function sendTokenToSMS(myphone, myToken) {
  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `[Web발신] 안녕하세요!! 인증번호는 ${myToken} 입니다!!`,
  });
  console.log(myphone + "번호로 인증번호 " + myToken + "를 전송합니다.");
  console.log(result);
}

export default function qqq() {}
