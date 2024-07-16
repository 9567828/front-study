const p = document.querySelector(".result")
const inputNumber = document.querySelector("#input-number")
const inputForm = document.querySelector("#input-form")

let a = 10;

if (a % 2 == 0) {
    console.log("짝수")
    // p.innerText = "짝수"
} else {
    console.log("홀수")
    // p.innerText = "홀수"
}

switch (a) {
    case 10:
        console.log("a가 10 입니다")
        break;
    case 11:
        console.log("a가 11임다")
        break;
    default:
        console.log("모든 경우에 해당하지 아나아나")
        break
}

function printNumber(value) {
    if (value % 2 == 0) {
        p.innerText = `입력한 ${value}는 짝수`
    } else {
        p.innerText = `입력한 ${value}는 홀수`
    }
}


inputForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = inputNumber.value;

    inputNumber.value = "";

    printNumber(value)

    console.log(value)
})