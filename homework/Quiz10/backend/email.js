import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";
// 1 . 유효한지 체크
function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("에러 발생! 이메일 주소를 제대로 입력해주세요!");
    return false;
  } else {
    return true;
  }
}
// 2. 이메일 템플릿 만들기
function getWelcomeTemplate({ userName, userEmail, userPhone }) {
  const myTemplate = `
        <html>
            <body>
               <div style="display:flex; flex-direction:column; align-items:center;"> 
                <div style = "width:500px">
                  <h1>${userName}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${userName}</div> 
                  <div>이메일: ${userEmail}</div>
                  <div>휴대폰번호: ${userPhone}</div>
                  <div>가입일: ${getToday()}</div>
                </div>
              </div>    
            </body>
        </html>
    `;
  return myTemplate;
}

export async function sendTemplateToEmail({ userName, userEmail, userPhone }) {
  // 1 . 유효한지 체크
  const isValid = checkEmail(userEmail);
  if (!isValid) return;
  // 2. 이메일 템플릿 만들기
  const template = getWelcomeTemplate({ userName, userEmail, userPhone });

  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  // 3. 이메일 전송
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: userEmail,
    subject: "회원가입을 축하합니다.",
    html: template,
  });
  console.log("메일 전송 완료");
}
