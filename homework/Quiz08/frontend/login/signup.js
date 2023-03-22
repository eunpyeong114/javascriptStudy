// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  const num1 = document.getElementById("PhoneNumber01").value;
  const num2 = document.getElementById("PhoneNumber02").value;
  const num3 = document.getElementById("PhoneNumber03").value;
  const phone = num1 + num2 + num3;
  await axios.post("http://localhost:3000/tokens/phone", {
    phone,
  });
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const num1 = document.getElementById("PhoneNumber01").value;
  const num2 = document.getElementById("PhoneNumber02").value;
  const num3 = document.getElementById("PhoneNumber03").value;
  const phone = num1 + num2 + num3;
  const name = document.getElementById("SignupName").value;
  const site = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pw = document.getElementById("SignupPwd").value;
  await axios.post("http://localhost:3000/templates/email", {
    name,
    phone,
    site,
    email,
    pw,
  });
  console.log("회원 가입 이메일 전송");
};
