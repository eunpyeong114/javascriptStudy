import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("에러 발생! 이메일 주소를 제대로 입력해주세요!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ age, name, school }) {
  const myTemplate = `
        <html>
            <body>
               <div style="display:flex; flex-direction:column; align-items:center;"> # 네이버 메일에만 적용 why? display가 비교적 최신 기술이기에
                <div style = "width:500px">
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div style="color:red">이름: ${name}</div>  # 네이버 / 구글 메일 둘 다 적용
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${getToday()}</div>
                </div>
              </div>    
            </body>
        </html>
    `;
  return myTemplate;
}

export async function sendTemplateToEmail(email, myTemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  // 전송하기 위해서 인증을 먼저하고 인증 받은 내용을 바탕으로 메일을 보낸다 라는 의미
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다.", // 제목
    html: myTemplate, // 보낼 HTML 템플릿
  });
  console.log(result);
  //console.log(`${email} 이메일로 가입환영템플릿 ${myTemplate}을 전송합니다`);
}
