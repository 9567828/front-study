// 유사한 객체를 여러개 만들기 위한 함수 (함수를 자바의 클래스 같은 것처럼 활용)
function Fruit(name, price) {
  this.name = name;
  this.price = price;
  console.log(this);
}

Fruit("김밥", 3000); // new 없이 사용하는 this는 window객체를 가리킨다.

// 함수를 그냥 new 없이 사용할 때와 new와 함께 사용할 때 this가 달라진다.
const fruit1 = new Fruit("사과", 1000);
const fruit2 = new Fruit("키위", 2000);

// new와 함께 사용하는 경우 실제로는 이런 일이 발생하게 된다.
function ActualFruit(name, price) {
  // this = {}; // 얘와
  this.name = name;
  this.price = price;
  // return this // 얘가 추가 되는 것으로 생각하면 된다.
}

const fruit3 = new Fruit("배", 3000);

// 생성자 함수에 메서드 추가하기
function Dog(nickname, strength) {
  this.nickname = nickname;
  this.strength = strength;
  this.bite = function () {
    // 내부에서 쓰는 this가 bite의 this를 가리킨다.
    console.log(`${this.nickname} bites enemy with ${this.strength} damage`);
  };
  // new와 함께 쓸때는 화살표함수의 this가 본인을 잘 가리킨다.
  this.jump = () => {
    console.log(`${this.nickname} jumps ${this.strength} meter`);
  };
}

const dog1 = new Dog("복돌이", 3000);
const dog2 = new Dog("남순이", 1500);
dog1.bite();
dog1.jump();

dog2.bite();
dog2.jump();
