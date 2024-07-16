let a = 10;
let b = 3;

console.log(a + b)
console.log(a - b)
console.log(a / b)
console.log(parseInt(a / b))
console.log(a % b)
console.log(a * b)

a = 10, b = "10", c = "11";

// ==은 10과 "10"을 같은 값이라고 한다
console.log(a == b)
console.log(a == c)

// !=은 10과 "10"을 같은 값이라고 생각하기 때문에 false를 출력한다
// a와 b가 같다고 생각했기 때문에 != 연산자로 인해 false가 나왔다는 말
console.log(a != b);
console.log(a != c);

// ===, !==은 10과 "10"이 다른 값이라고 생각한다 (타입이 달라서)
console.log(a === b)
console.log(a !== b)