interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입 // 기존의 <>의 타입을 선택적(?:)으로 만들어 줄 수 있음
type aaa = Partial<IProfile>;

// 2. Required 타입 // 기존의 <>의 타입을 필수입력으로 만들어 줄 수 있음
type bbb = Required<IProfile>;

// 3. Pick 타입 // 기존의 <>의 타입 중 일부만 뽑아서 필수입력값으로 만들어 줌
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입 // 기존의 <>의 타입 중 일부만 제거
type ddd = Omit<IProfile, "school">;

// 5. Record 타입  // 각각의 레코드로 분리되어 ' , ' 다음 타입으로 적용됨
type eee = "철수" | "영희" | "훈이"; // Union(합집합) 타입
let child1: eee = "훈이"; // string 타입 + eee타입 안에 있는 값 중 넣을 수 있음 = 타입 범위를 좁히는 것// 철수 영희 훈이만 들어갈 수 있음
let child2: string = "사과"; // 철수 영희 훈이 사과 바나나 다 됨

type fff = Record<eee, IProfile>;

// 6. 객체의 key들로 union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";

// 7. type과 interface 차이 => interface는 선언병합 가능(똑같은 게[IProfile] 두개 세개가 있는때 병합된다)
interface IProfile {
  candy: number; // 선언병합으로 추가됨
}

// 8. 배운 것 응용
let profile: Partial<IProfile> = { candy: 10 }; //Partial을 이용해 타입 값을 모두 선택적으로 바꿔주었음
