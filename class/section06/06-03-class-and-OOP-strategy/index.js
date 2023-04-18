class 공중부품 {
  run = () => {
    console.log("날아서 도망가자!!");
  };
}

class 지상부품 {
  run = () => {
    console.log("뛰어서 도망가자!!");
  };
}

class Monster {
  power = 10; //this.power
  부품; //초기값은 안넣은 상태
  constructor(qqq) {
    //qqq.run() 가능
    //생성자함수 몬스터가 처음 만들어질때 만들어지는 함수 = 초기값 줄때 사용  // 괄호 안 qqq 매개변수
    this.부품 = qqq;
  }

  attack() {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power + "야!!!"); // 클래스 안은 this라고 함 변수나 함수 앞에 this.가 생략되어 있다고 생각해야 함 this.attack
  }

  run = () => {
    this.부품.run();
  };
}

const mymonster1 = new Monster(new 공중부품());
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(new 지상부품());
mymonster2.attack();
mymonster2.run();
