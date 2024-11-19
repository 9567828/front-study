// window : 현재 웹 브라우져 객체

// window.localStorage : 웹 브라우저를 껐다 키더라도 유지되는 로컬 스토리지 객체
// setItem()으로 어떤 타입 데이터를 저장하더라도 문자열로 저장하게 된다
window.localStorage.setItem("score", 3800);
window.localStorage.setItem("nickname", "봉봉아이스티");

// getItem()으로 데이터를 꺼낼 때도 문자열 타입으로 꺼내온다
console.log(window.localStorage.getItem("userName"));
console.log(window.localStorage.getItem("score"));
console.log(typeof window.localStorage.getItem("score"));
console.log(window.localStorage.getItem("nickname"));
console.log(typeof window.localStorage.getItem("nickname"));

// window.sessionStorage: 웹브라우저가 켜저있는 켜져있는 동안만 유지되는 데이터
window.sessionStorage.setItem("age", 20);

console.log(window.sessionStorage.getItem("age"));
console.log(typeof window.sessionStorage.getItem("age"));

// 가위바위보 게임 만들기
const comRcp = document.querySelector(".com-rcp");
const comIcon = document.querySelector(".com-icon");
const iconI = document.querySelector(".com-icon .fa-regular");
const iconName = ["fa-hand", "fa-hand-peace", "fa-hand-back-fist"];
const randomRcp = () => Math.floor(Math.random() * 3);

const userRcp = document.querySelectorAll(".fa-3x > .fa-regular");
const userPickDisplay = document.querySelector(".user-pic");
const winnerImg = document.querySelector(".winner-img");
const loserImg = document.querySelector(".loser-img");
const drawImg = document.querySelector(".draw-img");
const imgArr = [winnerImg, loserImg, drawImg];

const RESULT = document.querySelector(".result");

let money = 1000;
const gameMoney = document.querySelector(".game-money");
gameMoney.innerText = money;

Array.from(userRcp).forEach((rcp, index) => {
  rcp.addEventListener("click", (e) => {
    const compic = randomRcp();

    if (index == compic) {
      RESULT.innerText = "비겨따";
      printResultList("비겼다");
      checkImgOff(drawImg);
      money -= 0;
    } else if ((index + 1) % 3 == compic) {
      RESULT.innerText = "졌다";
      printResultList("졌다");
      checkImgOff(loserImg);
      money -= 500;
    } else {
      RESULT.innerText = "이겨따";
      printResultList("이겼다");
      checkImgOff(winnerImg);
      money += 300;
    }

    gameMoney.innerText = money;

    if (compic == 0) {
      comRcp.innerText = "보";
      comIcon.innerHTML = `<i class="fa-regular fa-hand"></i>`;
    } else if (compic == 1) {
      comRcp.innerText = "가위";
      comIcon.innerHTML = `<i class="fa-regular fa-hand-peace"></i>`;
    } else {
      comRcp.innerText = "바위";
      comIcon.innerHTML = `<i class="fa-regular fa-hand-back-fist"></i>`;
    }

    if (index == 0) {
      userPickDisplay.innerText = "보";
    } else if (index == 1) {
      userPickDisplay.innerText = "가위";
    } else {
      userPickDisplay.innerText = "바위";
    }
  });
});

const resultList = document.querySelector(".result-list");

function checkImgOff(name) {
  for (let i = 0; i < imgArr.length; ++i) {
    name == imgArr[i] ? name.classList.remove("off") : imgArr[i].classList.add("off");
  }
}

checkImgOff("winnerImg");

function printResultList(text) {
  const newLi = document.createElement("li");
  newLi.id = Date.now();
  newLi.innerText = `${text}`;

  resultList.appendChild(newLi);
}

const userForm = document.querySelector(".user-name-form");
const inputName = document.querySelector("#input-name");
let userNameText = document.querySelector(".user-name");

let userName = localStorage.getItem("userName");
function printName(name) {
  userNameText.innerText = name;
}

while (!userName) {
  if (userName) {
    localStorage.setItem("userName", userName);
  }
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = inputName.value;

  console.log(value);
  printName(value);
});
