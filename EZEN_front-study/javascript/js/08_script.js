const out = document.getElementById("out");

console.log(out)
// out.innerHTML = '원하는 값! <br>';
// // 누적연산~~~~~~
// out.innerHTML += '원하는 값2! <br>';
// // 그냥 = 로 넣으면새로운 값으로 인식 되어서 위에 애들은 사라진다
// out.innerHTML += '원하는 값3! <br>';

const print = text => out.innerHTML += text;

// 디폴트값 설정, 아무것도 전달이 안됐을 대는 ''처럼 해준다
const println = (text = "") => print(text + '<br>');
const printDiv = text => print(`<div>${text}</div>`);


print('안녕하슈');
print('반갑');
println('?????')
println('넘어갔다')
printDiv('어쩔');

const fruits = 'apple/banana/kiwi/pineapple/grape';

const animal1 = 'giraffe';
const animal2 = 'horse';

const word1 = '돼지고기';
const word2 = '돼지고기두루치기';

// 자바스크립트는 문자열끼리 비교 연산자를 사용할 수 있다 (사전순 비교)
console.log(animal1 < animal2)
console.log(word1 > word2)

// 문자열의 문자 하나에 접근하기
println('furits[0]: ' + fruits[0])

// length
println('length: ' + fruits.length);

// 반복문으로 한 글자씩 접근하기
for (let i = 0; i < fruits.length; ++i) {
    println(`fruits[${i} = ${fruits[i]}]`)
}

for (ch of fruits) {
    print(ch);
}
println()

// substring, slice
println('substring(5, 10): ' + fruits.substring(5, 10));
println('substring(10): ' + fruits.substring(10));

println('slice: ' + fruits.slice(5, 10));
println('slice: ' + fruits.slice((10)));
println('slice: ' + fruits.slice((-5)));

// toUpperCase(), toLowerCase()
println(fruits.toUpperCase());

println(fruits.indexOf('apple', 1))
// split : 스플릿
console.log(fruits.split('/'))

for (fruit of fruits.split('/')) {
    println(fruit)
}

// Escape 문자
console.log('\n');
console.log('\\');
console.log('\t');
console.log('\u1234'); // 유니코드 그냥적으면 4자리까지 가능
console.log('🎃');
console.log('\u{1F383}') // 4자리 초과값은 {}를 사용해야함
console.log('\u{1F686}');
console.log('\u{1F31A}');

// codePointAt(): 문자의 아스키코드(유니코드) 보기
console.log('가'.codePointAt());
console.log(new Number(44032).toString(16));
console.log('\uac00')