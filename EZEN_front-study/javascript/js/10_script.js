// [] : 빈 배열 설정

const drinks = [];
// const drinks2 = new Array(); 위에 것을 더 잘 사용한다

// drinks를 const로 선언했지만 배열의 내용은 변경이 가능하다
// 배열의 내용을 바꾸는 것이지 다른 배열로 교체하는 것이 아니기 때문이다
drinks[0] = '콜라';
drinks[1] = '사이다';
// drinks2[0] = '콜라';
// drinks2[1] = '사이다';

// 새로운 배열을 대입하는 것은 const에 걸린다
// drinks = ['coke', 'sprite']

console.log(drinks)
// console.log(drinks2)

// 메서드로 값 추가하기 : pop, push, shift, unshift
drinks.push('판타');
console.log('after push: ', drinks)
drinks.unshift('보리차');
console.log('after unshift: ', drinks)
let popresult = drinks.pop();
console.log('pop() result: ', popresult)
console.log('after pop: ', drinks)
console.log('shift() result: ', drinks.shift());
console.log('after shift(): ', drinks);

// 배열의 spread
console.log(...drinks);

const groundAnimals = ['사자', '호랑이', '라이온', '타이거'];
const oceanAnimals = ['돌고래', '상어', '가오리', '거북이'];

// spread를 활용한 배열 합성
const animals = [...groundAnimals, ...oceanAnimals];
console.log(animals) // 배열이 합쳐짐

// 배열 복사하기
const groundAnimalsCopy = groundAnimals;
groundAnimalsCopy[3] = '타조';
console.log('원본: ', groundAnimals);
console.log('카피: ', groundAnimalsCopy);

// spread를 활용해 배열의 복사본 생성하기
const oceanAnimalsCopy = [...oceanAnimals];

oceanAnimalsCopy.unshift('해파리');
console.log('원본: ', oceanAnimals)
console.log('카피: ', oceanAnimalsCopy)

// split: 문자열을 원하는 구분자를 기준으로 나눠주는 함수
// join: 배열의 모든 내용에 원하는 구분자를 붙여 문자열로 변환
const fruits = ['red grape', 'apple mango', 'apple', 'orange', 'grape', 'kiwi'];

let joinResult = fruits.join('-');
console.log(joinResult);
console.log(joinResult.split('-'));

// sort(): 배열 내용을 정렬한다
fruits.sort();
console.log(fruits)

// reverse(): 모든 내용을 뒤집는다
fruits.reverse();
console.log(fruits)

// 숫자를 정렬할 때 sort()는 기본적으로 사전순으로 정렬을 한다
const numbers = [1, 11, 2, 55, 3, 3, 9, 29, 27, 13, 33, 31, 333, 80, -10, -90];

// sort(Comparator) : 원하는 기준을 직접 설정하기
//                    (기준이 될 함수를 직접 생성하여 전달)
function compareNumber(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

// numbers.sort((a, b) => a - b);
numbers.sort(compareNumber);
console.log(numbers)

// 연습: 랜덤 숫자 100개를 빈 배열에 추가한 후 내림차순으로 정렬해보세요

const ranNum = [];

for (let i = 0; i < 100; ++i) {
    ranNum[i] = parseInt(Math.random() * 100 + 1);
}
console.log(ranNum);

function sortNumber(a, b) {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    } else {
        return 0;
    }
}

ranNum.sort(sortNumber);
// ranNum.sort((a, b) => a - b);
console.log(ranNum)