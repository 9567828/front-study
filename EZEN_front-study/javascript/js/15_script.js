function Cat(nickname, age, crying) {
  this.nickname = nickname;
  this.age = age;
  this.crying = crying;
  this.cry = function () {
    console.log(`${this.nickname}이 ${this.crying}하고 울었습니다.`);
  };
}

const c1 = new Cat("나비", 5, "냐아");
const c2 = new Cat("애옹", 6, "애용");
console.dir(c1);
console.dir(c2);

c1.cry();
c2.cry();

// 이미 인스턴스가 생성된 이후에 프로토타입이 수정되어도
// 생성되어 있는 인스턴스에 변경 사항이 모두 적용 된다
Cat.prototype.bite = function (target) {
  console.log(`${this.nickname}가 ${target}을 물었습니다.`);
};
c1.bite("손가락");
c2.bite("머리카락");

// 해당 인스턴스에서 프로토타입에 접근할 때는 __proto__를 사용한다
console.log(c1.__proto__);

c1.__proto__.walk = function () {
  console.log(`${this.nickname} 사뿐사뿐 걷습니다.`);
};

c2.walk();
