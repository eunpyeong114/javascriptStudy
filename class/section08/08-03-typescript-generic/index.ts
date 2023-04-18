// 1. 기본 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  //prettier-ignore
  return [arg3, arg2, arg1]
};
const result = getPrimitive("철수", 123, true);
result[0];
result[2] * 10;

//
//
// 2. any타입 자바스크립트랑 같음
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다 됨!
  return [arg3, arg2, arg1];
};
const result = getAny("철수", 123, true);

// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") {
    console.log(arg1 + 100);
  }
  return [arg3, arg2, arg1];
};
const result = getUnknown("철수", 123, true);

// 4. generic 타입  // 나만의 타입을 쓰는 경우 // 실행할 때마다 타입이 바뀐다!= 타입추론 // 안전한 any
function getGeneric1<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}
const result = getGeneric1("철수", 123, true);

// 4. generic 타입  // 나만의 타입을 쓰는 경우 // 실행할 때마다 타입이 바뀐다! // 안전한 any
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
const result = getGeneric2("철수", 123, true);

// 4. generic 타입  // 나만의 타입을 쓰는 경우 // 실행할 때마다 타입이 바뀐다! // 안전한 any
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}
const result = getGeneric3("철수", 123, true);

// 4. generic 타입  // 화살표 함수
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result = getGeneric4<string, number, boolean>("철수", 123, true); // 제네릭에서, 타입 명시가 필요한 상황
