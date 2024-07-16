const sosu = document.getElementById("sosu");
const evenOrOdd = document.getElementById("even");

// 더하기
const plusForm = document.getElementById("plus-form");
const plusNumA = document.getElementById("plusInput-a");
const plusNumB = document.getElementById("plusInput-b");
const pluseResult = document.querySelector(".plus-result");

const printPlusNumber = (a, b) => {
  pluseResult.innerText = a + b;
};

plusForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const valueA = parseInt(plusNumA.value);
  const valueB = parseInt(plusNumB.value);

  printPlusNumber(valueA, valueB);
});

// 알파벳 확인하기
const engForm = document.querySelector("#eng-form");
const alphabet = document.getElementById("alphabet");
const alphabetResult = document.querySelector(".alphabet-result");
const isAlphabet = (ch) => (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");

function checkInputLength(e) {
  if (e.value.length >= e.maxLength) {
    alert(`최대 길이는 ${e.maxLength}자 입니다`);
    return;
  }
}

const isEnglish = (text) => {
  for (ch of text) {
    if (!isAlphabet(ch)) {
      alphabetResult.innerText = "알파벳이 아닙니다";
      return false;
    }
  }
  alphabetResult.innerText = "영어다~";
  return true;
};

engForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = alphabet.value;
  alphabet.value = "";

  console.log(value, typeof value);
  console.log(isEnglish(value));

  isEnglish(value);
});

// 3배수
const mul3Form = document.querySelector("#mul3-form");
const mulInput = document.querySelector("#mul3-input");
const mulResult = document.querySelector(".mul-result");

const isMul = (num) => {
  if (num % 3 == 0) {
    mulResult.innerText = "3배수 입니다.";
  } else {
    mulResult.innerText = "3배수 아임다";
  }
};

mul3Form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = mulInput.value;

  isMul(value);
});

// 약수
const yaksuForm = document.querySelector("#yaksu-form");
const yaksuInput = document.getElementById("yaksu-input");
const yaksuResult = document.querySelector(".yaksu-result");

const getYacksu = (num) => {
  let index = 0;
  const yaksu = [];

  if (num == 0) {
    yaksuResult.innerText = "0은 없다";
    return;
  }
  for (let i = 1; i <= num; ++i) {
    if (num % i == 0) {
      yaksu[index++] = i;
    }
  }
  return (yaksuResult.innerText = yaksu);
};

// 소수
const isPrime = (num) => {
  if (num == 0) {
    primeResult.innerText = "0이다";
    return;
  }
  getYacksu(num).length == 2
    ? (primeResult.innerText = "소수입니다")
    : (primeResult.innerText = "소수아임다");
};

// 소수 같이
const primeInput = document.querySelector("#sosu-input");
const primeResult = document.querySelector(".prime-result");
yaksuForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const yaksuValue = yaksuInput.value;
  const primeValue = yaksuValue;

  primeInput.value = yaksuValue;

  getYacksu(yaksuValue);
  isPrime(primeValue);
});

// 짝수홀수
const evenForm = document.querySelector("#even-form");
const evenInput = document.querySelector("#even-input");
const evenResult = document.querySelector(".even-result");

const evenOrodd = (num) => {
  if (num % 2 == 0) {
    evenResult.innerText = "짝수입니당";
  } else {
    evenResult.innerText = "홀수입니당";
  }
};

evenForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = evenInput.value;
  evenOrodd(value);
});
