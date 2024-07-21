// 함수 선언
function func1() {
    return 10;
}

function func2() {
    console.log(10)
}

//함수 사용 (리턴이 없는 함수의 결과는 undefined)
console.log("func1() result: ", func1())
console.log("func2() result: ", func2())

// 함수 이름 뒤에 ()를 붙이지 않으면 함수 자체를 값으로 사용
console.log(func1)
console.log(func2)

//함수를 변수에 담아놓고 나중에 사용할 수 있다
let f1 = func1;
let f2 = func2;

console.log(f1())

// 함수를 매개변수로 전달받아 나중에 실행하게끔 ㅓㄹ계할 수 있다
// (아래 예제에서 func3의 a를 clallback 함수라고 부른다)
function func3(a) {
    return a();
}

console.log(func3(func1))

//  함수 표현식
const p = document.querySelector(".result")
const pNum = document.querySelector(".inputNumbers")

const add = function (a, b) {
    console.log(`${a} 전달받았슴다`)
    console.log(`${b} 전달받았슴다`)
    console.log('이제 두 값을 더할거에여')
    console.log(a+b)
    return p.innerText = a + b;
}

const form = document.querySelector("#date-form")
const inputA = document.querySelector(".input-a")
const inputB = document.querySelector(".input-b")

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const valueA = inputA.value;
    const valueB = inputB.value;

    inputA.value = "";
    inputB.value = "";

    add(parseInt(valueA), parseInt(valueB))

    pNum.innerText = `입력한 숫자 ${valueA} + ${valueB} =`
    console.log(typeof valueA, typeof valueB)
})

// myFunctionName(10, 11) 함수에 이름을 붙일 필요가 없다
// console.log(add(20, 11))


console.log(getAnswer());
// console.log(getAge());

// function으로 만든 함수는 코드 아래 부분에서 선언하더라도 위쪽에서 사용이 가능하다
// (끌어올려진다 전문용어 - 호이스팅)
function getAnswer() {
    return "answer";
}

// 함수 표현식으로 만든 함수는 코드 아래에 있으면 사용할 수 없다
// (변수의 경우에는 선언만 끌올되고 대입은 끌올되지 않는다)
// const getAge = function() {
//     return "age"
// }

// 이러한 문제가 발생하지 않도록 함수으 선언은 소스 코드 맨 위에 두는 것이 바람직 하다

// 화살표 함수 (함수 표현식을 더 짧고 간편하게 사용)
const getNumber = () => {
    return Number;
}

const getAge = (a, b, c) => {
    return(a + b + c) / 3
}

const printHimessage = () => {
    // console.log(name + '님 하이')
    console.log(name + '님 잘가')
}

printHimessage('김철수')

const printPersonInfo = info => {
    console.log(`${info.name}님 하이`)
    console.log(`나이: ${info.age}살`)
    console.log(`점수: ${info.math}점`)
    info.greeting('봉석');
}

// object의 value로 함수를 사용하여 메서드로 활용할 수 있다
printPersonInfo({
    name: '최민식', 
    age: 50, 
    math: 87,
    // this는 여기있는 애~
    greeting: function (name) {
        console.log(`안녕! ${this.name} 잘사냐?`)
    }
})

// 함수의 내용이 return한 줄 밖에 없는 경우 {}와 return을 생갹 가능하다
// const getPrice = () => {
//     return 1500;
// }
const getPrice = () => 1500;

console.log(getPrice())

// 랜덤 색상을 뽑는 함수를 한 줄로 줄일 수 있다
const colors = ['red', 'orange', 'blue', 'purple']
const getRandomColor = () => colors[parseInt(Math.random() * colors.length)]

for (let i = 0; i < 10; ++i) {
    console.log(getRandomColor())
}

// 연습: 다음 내용을 화살표 함수로 변경해보기

// function ask(question, yes, no) {
//     if (confirm(question)) yes()
//     else no();
// }

// ask (
//     "동의하십니까?",
//     function() { alert("동의하셨습니다."); },
//     function() { alert("취소 버튼을 누르셨습니다."); },
// );


// const ask = (question, yes, no) => {
//     if (confirm(question)) yes()
//     else no()
// };

// 동의하십니까? -> question
// 동의했다 > yes
// 동의x > no 순서대로 들어가는 것
// confirm > 알림창 띄우는 것(prompt)
// ask(
//     "동의하십니까?",
//     () => { alert ("동의했다") },
//     () => { alert ("동의안했다") }
// );

/*
    # 다음 함수를 정의하고 올바르게 동작하는 테스트 해보세요

    funtion 버전, arrow funtion 버전
    
    1. 전달한 문자가 알파벳이면 ture를 반환, 아니면 false를 반환하는 함수
    2. 전달한 숫자가 3의 배수이면 true를 반환, 아니면 false를 반환하는 함수
    3. 숫자를 하나 전달하면 문자열 "짝수입니다" 또는 "홀수 입니다"를 반환하는 함수
    4. 숫자를 전달하면 해당 숫자의 모든 약수를 int[]로 반환하는 함수
    5. 전달한 정수가 소수라면 ture를 반환하고 아니면 false를 반환하는 함수
    6. 메세지와 횟수를 전달하면 해당 메세지를 전달한 횟수만큼 반복하는 함수
*/

// function isAlphabet(ch) {
//     return (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z');
// }

// 값이 하나만 있으면 소괄호가 빠져도 된다
// const isAlphabet = ch => (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z');
// console.log("1번문제 ", isAlphabet(prompt("입력")));

// 풀이
// 텍스트의 모든 내용이 영어인지? for..of로 반복문
// 위의 함수를 활용하여 모든 문자열을 검사하는 함수를 생성
// const isAllEnglish = text => {
//     for (ch of text) {
//         console.log("테스트", ch)
//         if (!isAlphabet(ch)) {
//             return false;
//         };

//     }
//     return true;
// };

// let word = prompt("입력");
// console.log(`${word} - 영어인가요? ${isAllEnglish(word)}`);


// function isMul(num) {
//     return num % 3 == 0;
// }

// const isMul3 = (num) => num % 3 === 0;

// console.log(isMul(prompt("숫자입력")));
// console.log(isMul3(prompt("숫자입력")));

// function isEven(num) {
//     if (num % 2 === 0) {
//         return "짝수입니다"
//     } else {
//         return "홀수입니다"
//     }
// }

// const isEven = (num) => num % 2 == 0 ? "짝수입니다" : "홀수입니다";
// console.log(isEven(prompt("숫자입력")));

// 번외: 전달한 숫자에 따라 "짝수입니다" 경고창 또는 홀수입니다 경고창을 띄워주는 함수
const evenOrOdd = num => num % 2 == 0 ? alert("짝수!") : alert("홀수!");
evenOrOdd(prompt("숫자입력"));


// function printMessage(str, num) {
//     for(let i = 0; i <= num; ++i) {
//         console.log(`횟수${i}, ${str}`);
//     }
// }

// printMessage('ddd', 3);

// const printMessage1 = (str, num) => {
//     for(let i = 0; i <= num; ++i) {
//         console.log(`횟수${i}, ${str}`);
//     }
// }

// printMessage1('gggg', 2);

// function getYacsu(num) {
//     let index = 0;
//     const arr = [];

//     for (let i = 1; i <= num; ++i) {
//         if(num % i == 0) {
//             arr[index++] = i;
//         }
//     }
//     return arr;
// }

// console.log(getYacsu('5'));

// const getYacsu = (num) => {
//     let index = 0;
//     const arr = [];

//     for (let i = 1; i <= num; ++i) {
//         if (num % i == 0) {
//             arr[index++] = i;
//         }
//     }
//     return arr;
// }
// console.log(getYacsu('10'));

// function isPrime(num) {
//     return getYacsu(num).length == 2;
// }

// const isPrime = (num) => getYacsu(num).length == 2;

// console.log(isPrime(10));

// 약수 풀이

function getYacksuArr(num) {
    let yaksu = [];
    let cnt = 0;

    for (n = 1; n <= num; ++n) {
        if (num % n == 0) {
            yaksu[cnt++] = n;
        }
    }
    return yaksu;
}

console.log(getYacksuArr(15));

const isPrime2 = num => getYacksuArr(num).length == 2;
let inputNum = prompt("소수일까 아닐까? 숫자입력")
console.log(`입력한 ${inputNum}은 소수? ${isPrime2(inputNum)}`);