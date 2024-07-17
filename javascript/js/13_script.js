// 객체의 값으로 함수를 넣어놓으면 해당 객체의 메서드가 된다
const dog = {
  name: "백구",
  leg_str: 10,
  run: function () {
    console.log(`${this.name} ${this.leg_str}의 다리 힘으로 달립니다.`);
  },
};
dog.run();

// 이미 만들어진 객체에 메서드를 추가 할 수도 있다
dog.jump = function () {
  console.log(`${this.name} ${this.leg_str * 0.8}의 힘으로 점프합니다.`);
};

// this는 호출 할 때 누구인지 결정 되는 값을 의미한다
dog.jump();

// 객체에 메서드를 정의할 때도 단축 프로퍼티 문법을 사용할 수 있다
const turtle = {
    name: "거북이",
    age: 200,
    introduce() {
    console.log(`안녕? 나는 ${this.name}, ${this.age}살`);
    }, // introduce: function() {} 과 동일한 결과
};

turtle.introduce();

// 메서드를 정의할 때 화살표 함수를 사용하면 this를 사용하지 못한다
// this를 활용하려면 function() 을 사용해야 한다
const bear = {
    name: "쿠마",
    bite: (enemy) => {
        // 화살표 함수의 this는 현재 객체 바깥을 참조하게 된다
        console.dir(this);
        console.log(`${this.name} ${enemy} 세게 물었다`);
    },
};

bear.bite("토토로");

const wolf = {
  name: "늑돌이",
  // 객체 내부에 생성된 함수 이므로 올바른 this를 가지고 있다
  bite(enemy) {
    const biteProcess = () => {
      console.dir(this);
      console.log(`${this.name} ${enemy} 물었다`);
    };
    // 객체 내부의 새로운 익명 함수로써 본인의 this를 가지게 된다
    // const biteProcess = function() {
    //     console.dir(this)
    //     console.log(`${this.name} ${enemy} 물었다`)
    // }
    biteProcess();
  },
};

wolf.bite("토토로 친구");

// this는 객체의 메서드 내부에서 해당 객체를 가리키는 것
// 객체의 메서드 밖에서는 올바르게 동작하지 않는다

function makeFruit(name, price) {
    return {
        name,
        price: price * 2,
        ref: this,
    }
}

makeFruit()