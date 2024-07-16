// 객체
const snack1 = {
  // key: value
  name: "포카칩",
  price: 1500,
};

// 같은 형태임
const snack2 = new Object();

console.log(snack1.name);
console.log(snack1["name"]);

// 객체에 값 추가
snack2.name = "오감자";
snack2.price = 3000;
snack2.event = true;

// 값 변경하기
snack2.event = false;

// 객체의 {키: 값}을 삭제하기
delete snack2.event;

console.log(snack2);

// const로 만든 배열, object는 내용 수정이 가능하지만
// 새로운 객체로 교체하는 것은 불가능 하다

// 객체의 키 값에 공백을 포함하고 싶은 경우 "" (쌍따옴표)로 묶어서 사용 가능
const cat1 = {
  name: "오즈",
  age: 8,
  "like friends": false,
};
console.log(cat1);

const cat2 = {};
(cat2.name = "첵스"), (cat2.age = 10);
cat2["like frineds"] = true;
console.log(cat2);

// 객체의 키 값을 동적으로 사용하고 싶은 경우 \
// []를 사용해 해당 키 이름이 변수를 사용해 정해진다는 것을 알릴 수 있다
// const keyName = prompt("어떤 항목이 Smith냐?");
const keyName = "fname";

const user1 = {
  [keyName]: "Smith",
};

console.log(user1);

// 새 객체를 생성할 때 단축 프로퍼티를 사용할 수 있다
// (변수명을 그대로 키 값으로 사용)

// 자바와 달리 자바스크립트는 키와 밸류의 이름이 같으면 생략할 수 있다
const createButton = (label, width, height, color) => {
  return {
    label,
    width,
    height,
    color,
  };
};

console.log("클릭!", 100, 50, "red");

// 객체는 for...in 문으로 쉽게 반복할 수 있다
for (key in cat1) {
  console.log(`${key}=${cat1[key]}`);
}

// 그냥 in 연산자는 해당 객체에 키 값이 존재하는지 쉽게 확인할 수 있다
console.log("name이라는 키값이 cat1에 있나?", "name" in cat1); // true
console.log("food라는 키값이 cat1에 있나?", "food" in cat1); // false

// Object.keys() 메서드를 사용해 key들로 이루어진 Array를 꺼낼 수 있다
console.log(Object.keys(cat2));

// 배열을 쉽게 다룰 수 있는 forEach를 활용할 수 있다
Object.keys(cat2).forEach((key) => {
  console.log(`${key}=${cat2[key]}`);
});

// 연습: 모든 사원들의 월급의 총합을 구해보세요
const salaries = {
  john: 3500,
  smith: 4200,
  ellen: 2800,
  peter: undefined,
  peng: NaN,
  minsu: 3000,
};

const total = Object.values(salaries).reduce(
  (sum, salary) => sum + (salary ? salary : 0),
  0
);
console.log(total);

// 자바에서 배운 for문으로 풀기
const salariesKeySet = Object.keys(salaries);

let totalSalary = 0;
for (let i = 0; i < salariesKeySet.length; ++i) {
  const empName = salariesKeySet[i];

  console.log(`${i}번째 key: ${empName}`);

  const salary = salaries[empName];
  if (salary === undefined) {
    console.log(`${empName}님의 월급은 undefined이라서 더하지 않았다`);
  } else if (isNaN(salary)) {
    console.log(`${empName}님의 월급은 NaN이라서 더하지 않았다`);
  } else {
    totalSalary += salary;
  }
}
console.log(`모든 월급의 총합은 ${totalSalary}입니다`);

// 풀어본거
totalSalary = 0;
Object.values(salaries).forEach((salary) => {
  if (isNaN(salary) || salary === undefined) {
    console.log("정해진 월급이 없다");
  } else {
    totalSalary += salary;
  }
});

console.log(totalSalary);

// 풀이: 자바스크립트 식으로 풀기
// sum의 초기값은 0
totalSalary = Object.values(salaries).reduce((sum, salary) => {
  if (isNaN(salary) || salary === undefined) {
    // 그냥 sum으로 리턴한다 즉(0)
    return sum;
  }
  return sum + salary;
}, 0);

console.log(`두번째 결과: ${totalSalary}`);

// if문으로 유효값 체크 쉽게 하기
// const num = undefined; // false
// const num = NaN; // false
// const num = null; // false
// const num = 0; // false
// const num = Infinity; //true
const num = undefined;

// num에 유효한 값이 들어있으면 true 아니면 false (비교연산이 아님)
if (num) {
  console.log(num);
} else {
  console.log(`num에 이상한게 들어있다. ${num}`);
}

// 위의 if문을 활용해서 삼항 연산자로 변환
console.log(num ? `제대로 된 값 ${num}` : `이상한 값 ${num}`);

totalSalary = Object.values(salaries).reduce(
  // 위 if문 처럼 삼항 연산자의 ?로 안좋은 값이 있으면 알아서 걸러서 계산한다
  (sum, sal) => (sal ? sum + sal : sum),
  0
);
console.log(`세번째 총합: ${totalSalary}`);

// 연습2: 가격을 두 배로 만든 새로운 객체를 생성해 보세요
//        가격이 문자열로 들어있는 과일도 2배로 만들어라
//        가격이 이상한 과일은 가격을 0으로 만들 것
const fruits = {
  apple: 300,
  orange: 500,
  banana: 1200,
  kiwi: "2300",
  "gold kiwi": 2800,
  grape: undefined,
};

// const fruitsPrices = Object.values(fruits).map((price) =>
//   price ? price * 2 : 0
// );
const fruits2 = {};
const fruitsPrices = Object.keys(fruits).map((fruits2, price) => {
  const p = fruits[price];
  fruits2[price] = p ? p * 2 : 0;
  return fruits2;
}, {});
console.log("맵으로", fruitsPrices);

// 풀이
const doublePrice = (obj) => {
  const obj2 = {};

  for (key in obj) {
    const price = parseInt(obj[key]);
    obj2[key] = price ? price * 2 : 0;
  }
  return obj2;
};

console.log(doublePrice(fruits));

// reduce
// 첫번째 누적값 :
const doubledFruits = Object.keys(fruits).reduce((obj2, key) => {
  const price = fruits[key];
  obj2[key] = price ? price * 2 : 0;
  return obj2;
}, {}); // 새로운 오브젝트를 누적 연산의 초기값을 설정

console.log(doubledFruits);
