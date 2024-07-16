// 자바스크립트에는 정해진 변수 타입이 없다
// 심지어 변수를 선언하지 않고도 사용할 수 있다

a = 10;

console.log(a)

a = '김말이'

console.log(a)


// var로 변수를 선언할 수 있지만 같은 이름으로 재선언하는 것을 막지 못함
var b = 10;
var b = 12;
console.log(b)

// 값을 초기화하지 않으면 undefined라는 것이 들어있다(값이 없다는뜻)
var c;
console.log(c)

let d = 123;
// let d = 30;
// let은 중복선언을 제대로 막아준다
console.log(d)

d = 1111;

console.log(d)

d = '야끼맨두'

console.log(d)

const e = 'ABCD';

// e = 'EEFEFE';
// const로 선언된 변수는 값을 변경할 수 없다

console.log(e)