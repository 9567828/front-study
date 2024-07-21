const out = document.getElementById("out")

const addNewLine = line => 
    out.innerHTML += `<div>${line.cell1}</div>
        <div>${line.cell2}</div>
        <div>${line.cell3}</div>`;

addNewLine ({
    cell1: 'parseInt', 
    cell2: 'parseInt(10.123)', 
    cell3: '결과: 10'
});

addNewLine ({
    cell1: 'parseFloat', 
    cell2: 'parseFloat(123.1234)', 
    cell3: '결과: float'
});

let a = 10;
let b = '10';

// 자바스크립트에서는 ==과 ===을 주의해야 한다
console.log(a == b);

a = 1e3; // 1에 10을 3번 곱한 결과 (부동 소수점 리터럴)
console.log('1e3: ', a)

a = 1.333e4 // 1.333에 10을 4번 곱해라
console.log('1.333e4: ', a);

a = 1.234e-3 // 1.234에서 10을 3번 나눈 결과
console.log('1.234e-3: ', a);

// Infinity: 무한: 무한, 숫자 타입 값이다
console.log(10 / 0);
console.log(typeof Infinity)

// NaN : Not a Number
console.log(NaN);
console.log(typeof NaN)

// 2진수, 8진수, 16진수
console.log(new Number(0b111).toString(2)); // 2진수 111
console.log(new Number(0o111).toString(8)); // 8진수 111
console.log(0x111); // 16진수 111
console.log(111); // 10진수 111

// Number()로 다른 타입 값을 숫자로 변환할 수 있다
console.log(Number('123.1234'));
console.log(typeof Number('123.1234'));

// boolean 타입도 숫자로 변환할 수 있다
console.log(Number(true));
console.log(Number(false));

// 자바스크립트에서는 1도 true취급 받는다
let i = 0;
while (1) {
    console.log("hiii")
    if (++i == 10) {
        break;
    }
}

// Date타입 인스턴스를 Number()로 변환하면 유닉스 타임을 알 수 있다
console.log(new Date());
console.log(Number(new Date()));

// Number()는 정수와 소수를 모두 포함한 개념이기 때문에 
// parseInt()와 parseFloat()이 따로 존재한다
console.log(parseInt('123.1234'));
console.log(parseFloat('123.1234'));

// 문자열 111을 2진법으로 변환해준다
// 원하는 진법으로 해석한 값을 구해준다
console.log('2진법으로 해석한 111', parseInt('111', 2));
console.log('8진법으로 해석한 111', parseInt('111', 8));
console.log('16진법으로 해석한 111', parseInt('111', 16));

console.dir(out);

// Math.round 반올림
console.log('반올림결과: ', Math.round(5.22324242));

// 올림
console.log('올림결과: ', Math.ceil(5.22324242));

// 내림
console.log('내림결과: ', Math.floor(5.22324242));

// 자바와 같은 랜덤
console.log('랜덤: ', Math.random())
console.log('10~30사이의 랜덤값', parseInt(Math.random() * 21) + 10);

// Math.max, min
console.log("최대값?: ", Math.max(2, 3, 4, 5, 6, 7));
console.log("최소값?: ", Math.min(2, 3, 4, 5, 6, 7));

let arr = [3, 4, 5, -1, 0, 8, 19, 10]

// ...을 사용해 값을 여러개 요구하는 곳에 배열을 펼쳐서 넣을 수 있다
// 스프레드라고 함
console.log('arr의 최대값', Math.max(...arr))
console.log('arr의 최소값', Math.min(...arr))

// Math.pow, Math.sqrt
console.log(Math.pow(2, 10)) // 2의 10제곰
console.log(Math.sqrt(49)) // 49의 제곱근


// parse: 문자 타입에서 해당 타입으로 변환 하는 것 (파싱 이라고 함)
// toString, stringify : 해당 타입 값을 문자로 변환하는 작업
let num = 1101;

console.log(num.toString());
console.log(num.toString(2)); // 10진수 1011을 2진법으로 문자열
console.log(num.toString(8)); // 10진수 1011을 8진법으로 문자열
console.log(num.toString(16).toUpperCase()); // 10진수 1011을 16진법으로 문자열

// NaN활용
console.log(Number('고구마'));
console.log('NaN === NaN: ', NaN === NaN) // false가 나온다
console.log('NaN == NaN: ', NaN == NaN) // false > 비교불가

let value = '100.32154';

// NaN은 비교연산자로는 비교가 불가능한 값이다
// isNaN() 함수를 사용해야 한다
// if(isNaN(Number(value))) {
//     alert("변환에 실패 했습니다");
//     console.log("변환에 실패 했습니다");
// } else {
//     alert("변환에 성공 했습니다");
//     console.log("변환에 성공 했습니다");
// }

/**
 * 연습: 최소값과 최대값을 매개변수로 전달하면
 * 해당 범위의 랜덤 정수를 반환하는 함수를 정의하고 테스트 해보세요
 * 
 * 사용 예: randomInteger(2, 10)은 2 ~ 10 사이의 정수가 반환된다
 */

function getRandomNum1(min, max) {
    return max <= min ? "최소값이 더 크거나 같다" : parseInt(Math.random() * (max - min + 1)) + min;
}

const getRandomNum = (min, max) => parseInt(Math.random() * (max - min + 1)) + min;
console.log('랜덤뽑기', getRandomNum1(-5, 3));
console.log('랜덤뽑기', getRandomNum(2, 10));

// 풀이
const randomInteger = (start, end) =>
    Math.floor(Math.random() * (Math.abs(end - start) + 1) + Math.min(start));

for (let i = 0; i < 10; ++i) {
    console.log(randomInteger(-1, 3));
}