// 1. 주민번호 가운데가 "-"로 구성되어 있는지 체크
export const haveSpecial = function (number) {
  if (number[6] !== "-") {
    console.log("주민등록번호 형식이 올바르지 않습니다");
    return false;
  } else {
    return true;
  }
};
// 2. 주민번호 앞6자리 , 뒤7자리 구성되어 있는지 체크
export const checkLength = function (number) {
  const splitNum = number.split("-");
  const frontNum = splitNum[0];
  const backNum = splitNum[1];
  if (frontNum.length !== 6 || backNum.length !== 7) {
    console.log("주민등록번호 자릿수를 제대로 입력해 주세요!!");
    return false;
  } else {
    return true;
  }
};
// 3. 주민번호 뒷자리 *로 변경
export const changeSpecial = function (number) {
  const secretNum = number.slice(0, 7) + "*******";
  return secretNum;
};

export const protectPersonal = function (number) {
  // 1. 주민번호 가운데가 "-"로 구성되어 있는지 체크
  const isChecked = haveSpecial(number);
  if (isChecked === false) return;
  // 2. 주민번호 앞6자리 , 뒤7자리 구성되어 있는지 체크
  const isValid = checkLength(number);
  if (isValid === false) return;
  // 3. 주민번호 뒷자리 *로 변경
  return changeSpecial(number);
};
