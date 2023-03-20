const haveSpecial = function (number) {
  if (number[6] !== "-") {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else {
    return true;
  }
};

const checkLength = function (number) {
  const splitNum = number.split("-");
  const frontNum = splitNum[0];
  const backNum = splitNum[1];
  if (frontNum.length !== 6 || backNum.length !== 7) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!");
    return false;
  } else {
    return true;
  }
};

const changeSpecial = function (number) {
  const targetNum = number.substring(8, 14);
  const changedNum = number.replace(targetNum, "******");
  console.log(changedNum);
};

const customRegistrationNumber = function (number) {
  // 1. 주민번호 가운데가 "-"로 구성되어 있는지 체크
  const isChecked = haveSpecial(number);
  if (isChecked === false) return;
  // 2. 주민번호 앞6자리 , 뒤7자리 구성되어 있는지 체크
  const isValid = checkLength(number);
  if (isValid === false) return;
  // 3. 뒤자리 7자리 중 끝자리 6자리는 *로 변경 + 콘솔출력
  changeSpecial(number);
};

customRegistrationNumber("2105101010101");
