// 타입 추론
let aaa = "안녕하세요"; // 처음 들어온 값으로 데이터 타입(string) 값을 추론
aaa = 3;

// 타입 명시
let bbb: string = "반갑습니다";
bbb = 10;

// 타입 명시가 반드시 필요한 상황 (괄호 생략가능)
let ccc: number | string = 1000;
ccc = "1000원";

// 숫자타입
let ddd: number = 10;
ddd = "철수";

// boolean 타입
let eee: boolean = true;
eee = false;
eee = "false"; //true로 작동함

// 배열 타입
let fff: number[] = [1, 2, 3, 4, 5]; // 숫자로만 구성된 배열
let ggg: string[] = ["철수", "영희", "훈이"];
let hhh: (string | number)[] = ["철수", "영희", "훈이", 10]; // 타입을 추론해서 어떤 타입을 사용하는지 알아보기!!

// 객체 타입 - 얘도 객체 키 값마다 타입추론이 됨
interface IProfile {
  name: string;
  age: string | number;
  school: string;
  hobby?: string; // ? 는 있어도 되고 없어도 되는 경우
}
const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};
profile.name = "훈이";
profile.age = "8살";
profile.hobby = "수영";

// const profile = {
//   name: "철수",
//   age: 8,
//   school: "다람쥐초등학교",
// };
// profile.name = "훈이"; // 타입추론으로는 이것만 가능!!
// profile.age = "8살";
// profile.hobby = "수영"; // 타입이 이미 추론되었기 때문에 새로운 키값 할당 안됨

// any 타입
let qqq: any = "철수"; // any를 사용하면 기존의 자바스크립트와 동일!
qqq = 123;
qqq = true;

// 함수타입 = 매개변수 타입, return 타입 따로 다 설정
function add(num1: number, num2: number, unit: string): string {
  // 어디서 누가 어떻게 호출할 지 모르므로, 매개변수 타입추론할 수 없음 => 반드시 타입명시 필요!!(따로 명시안하면 any로 인식)
  return num1 + num2 + unit;
}

const result = add(1000, 2000, "원"); // 결과의 리턴 타입도 예측 가능

const add2 = (num1: number, num2: number, unit: string): string => {
  // 어디서 누가 어떻게 호출할 지 모르므로, 매개변수 타입추론할 수 없음 => 반드시 타입명시 필요!!(따로 명시안하면 any로 인식)
  return num1 + num2 + unit;
};

const result2 = add(1000, 2000, "원");
