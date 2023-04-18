// 내가 클래스를 만들고 내장함수를 만드는 것
// class Date {

//     qqq = 3  // const ,let 붙이지 않는다

//     getFullYear(){ // function 붙이지 않는다

//     }
//     getMonth(){

//     }
// }

// 내장 함수
const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth() + 1); // 월은 0부터 시작하기 때문에

class Monster {
  power = 10; //this.power

  constructor(qqq) {
    //생성자함수 몬스터가 처음 만들어질때 만들어지는 함수 = 초기값 줄때 사용  // 괄호 안 qqq 매개변수
    this.power = qqq;
  }

  attack() {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power + "야!!!"); // 클래스 안은 this라고 함 변수나 함수 앞에 this.가 생략되어 있다고 생각해야 함 this.attack
  }

  run = () => {
    //this.run
    //화살표 함수로도 가능
    console.log("도망가자!!");
  };
}

class 공중몬스터 extends Monster {
  // extends를 사용해서 Monster 기능 상속
  // 오버라이딩(부모의 run을 덮어쓰기)
  constructor(aaa) {
    super(aaa + 1); // 공격력 1을 추가한 값을 부모의 초기값한테 넘겨줌
  }
  run = () => {
    console.log("날아서 도망가자!!");
  };
}

class 지상몬스터 extends Monster {
  constructor(bbb) {
    super(bbb); // 부모한테 다시 초기값 넘겨줄때 이처럼 작성
  }
  run = () => {
    console.log("뛰어서 도망가자!!");
  };
}

const mymonster1 = new 공중몬스터(20); //()안 전달인자를 constructor()에 보내줌 //20 = 초기값
mymonster1.attack();
mymonster1.run();
const mymonster2 = new 지상몬스터(50);
mymonster2.attack();
mymonster2.run();
