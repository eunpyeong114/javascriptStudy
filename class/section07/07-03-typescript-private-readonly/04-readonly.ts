// // public, private , protected ,readonly

// class Monster2 {
//   // power;  => public, private, protected, readonly 중 1개라도 있으면 생략가능(자동화 됨)

//   constructor(readonly power) {
//     //생성자함수 몬스터가 처음 만들어질때 만들어지는 함수 = 초기값 줄때 사용  // 괄호 안 qqq 매개변수
//     //this.power = power; // =>public, private, protected, readonly 중 1개라도 있으면 생략가능
//   }

//   attack1() {
//     console.log("공격하자!!");
//     console.log("내 공격력은 " + this.power + "야!!!"); // 클래스 안은 this라고 함 변수나 함수 앞에 this.가 생략되어 있다고 생각해야 함 this.attack  // 안에서 접근 가능
//     this.power = 30; // 안에서 변경 불가
//   }
// }

// class 공중몬스터2 extends Monster2 {
//   attack2() {
//     console.log("공격하자!!");
//     console.log("내 공격력은 " + this.power + "야!!!"); // 클래스 안은 this라고 함 변수나 함수 앞에 this.가 생략되어 있다고 생각해야 함 this.attack  //자식이 접근 가능
//     this.power = 30; // 자식이 변경 불가
//   }
// }

// const mymonster22 = new 공중몬스터2(20); //()안 전달인자를 constructor()에 보내줌 //20 = 초기값
// mymonster22.attack1();
// mymonster22.attack2();
// console.log(mymonster22.power); //밖에서 접근 가능
// mymonster22.power = 50; // 밖에서 변경 불가
