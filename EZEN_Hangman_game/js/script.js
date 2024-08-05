console.log("hi");

//prettier-ignore
const animal = ['lion', 'tiger', 'leopard', 'zebra', 'horse', 
    'bat', 'lizard', 'snake', 'bear', 'seal', 'monkey', 'cat', 
    'dog', 'pig', 'boar', 'wolf', 'fox', 'goat', 'cow', 'chipmunk', 
    'sloth', 'badger', 'mule', 'donkey', 'frog', 'toad', 'rat', 'mouse', 
    'dove', 'pigeon', 'owl', 'crow', 'magpie', 'ostrich', 'duck', 'heron', 'stork', 'swan'];

//prettier-ignore
const fish = ['dolphin', 'whale', 'tuna', 'salmon', 'shark', 
    'carp', 'stingray', 'catfish', 'blowfish', 'loach', 'shad', 'squid', 
    'clam', 'starfish', 'coral', 'shrimp', 'crab', 'crayfish', 'lobster']

//prettier-ignore
const bug = ["fly", "ladybug", "moth", "mantis", "wasp", "hornet", 
    "flea", "louse", "spider", "snail", "slug"];

const title = ["animal", "fish", "bug"];

const randomTitle = Math.floor(Math.random() * title.length);
const animalRandom = Math.floor(Math.random() * animal.length);
const fishRandom = Math.floor(Math.random() * fish.length);
const bugRandom = Math.floor(Math.random() * bug.length);
const wordWrap = document.getElementById("quiz-word");

const quizTitle = document.querySelector(".title");
const rightAnswer = document.querySelector(".right-answer");
const btns = document.querySelectorAll("#alphabet-wrap > button");

function pickRandomTitle() {
  title.forEach((value, i) => {
    if (randomTitle == i) {
      quizTitle.innerText = value;
    }
  });
}

pickRandomTitle();

let pickword;
function pickRandomWord() {
  if (randomTitle == 0) {
    return (pickword = animal[animalRandom]);
  } else if (randomTitle == 1) {
    return (pickword = fish[fishRandom]);
  } else {
    return (pickword = bug[bugRandom]);
  }
}

const divideWrap = document.querySelector(".divide-wrap");
// function divideWord(clickLetter) {
//   if (!pickword) {
//     console.log("pickword2에 결과가 없다");
//     return;
//   }

//   pickword = pickRandomWord();

//   let result = [];
//   for (let i = 0; i < pickword.length; ++i) {
//     let divideChar = pickword.charAt(i);
//     result.push(divideChar);

//     if (clickLetter == result[i]) {
//       const newP = document.createElement("p");
//       newP.classList.add("text" + i);
//       newP.textContent = result[i];
//       console.log(result[i]);
//       divideWrap.appendChild(newP);
//     }
//   }
// }

function showCorrectWord(clickLetter) {
  if (!pickword) {
    console.log("pickword2에 결과가 없다");
    return;
  }

  pickword = pickRandomWord();

  let result = [];
  for (let i = 0; i < pickword.length; ++i) {
    let divideChar = pickword.charAt(i);
    result.push(divideChar);

    const letterElement = document.querySelector(".text" + i);

    if (clickLetter == result[i]) {
      letterElement.textContent = result[i];
    }
  }
}

pickword = pickRandomWord();
console.log("선택단어: ", pickword);

function paintUnderline() {
  for (let i = 0; i < pickword.length; ++i) {
    const underLineWrap = document.createElement("div");
    underLineWrap.classList.add("underline-wrap");

    const newP = document.createElement("p");
    newP.classList.add("text" + i);

    const underLine = document.createElement("img");
    underLine.classList.add("underline");
    underLine.setAttribute("src", "./imgs/underline.svg");
    underLine.setAttribute("alt", "밑줄");

    underLineWrap.appendChild(newP);
    underLineWrap.appendChild(underLine);
    divideWrap.appendChild(underLineWrap);
  }
}

paintUnderline();

const bodies = document.querySelector(".bodies");
function isbodySafe() {
  bodies.classList.add("safe");
  bodiesArr.forEach((ele) => {
    ele.classList.add("on");
  });
}

function disableAllButtons() {
  btns.forEach((btn) => {
    btn.disabled = true;
  });
}

function checkCircle(ele) {
  const img = document.createElement("img");
  img.classList.add("circle");
  img.setAttribute("src", "./imgs/circle.png");
  img.setAttribute("alt", "동그라미");

  ele.appendChild(img);

  ele.setAttribute("disabled", "disabled");
}

function checkEx(ele) {
  const img = document.createElement("img");
  img.classList.add("ex");
  img.setAttribute("src", "./imgs/ex.png");
  img.setAttribute("alt", "엑스");

  ele.appendChild(img);

  ele.setAttribute("disabled", "disabled");
}

function checkAnswer() {
  let cnt = 0;
  let maxcnt = 7;
  let correctCnt = 0;

  btns.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (cnt < maxcnt) {
        const clickLetter = e.target.textContent;
        if (pickword.includes(clickLetter)) {
          checkCircle(ele);
          showCorrectWord(clickLetter);
          correctCnt += pickword.split(clickLetter).length - 1;
          if (correctCnt === pickword.length) {
            console.log("성공~!");
            gameResult(true);
            isbodySafe();
            disableAllButtons();
          }
        } else {
          cnt++;
          checkEx(ele);
          printBodies(cnt);
        }

        if (cnt === maxcnt) {
          if (correctCnt < pickword.length) {
            console.log("실패!");
            gameResult(false);
            head.classList.add("failed");
            disableAllButtons();
          }
        }
        checkChance(cnt, maxcnt);
      }
    });
  });
}

const chance = document.querySelector(".chance");
function checkChance(cnt, maxcnt) {
  const leftChance = maxcnt - cnt;
  chance.innerText = `남은기회: ${leftChance}`;
}

checkAnswer();

const resultText = document.querySelector("#correct > p");
function gameResult(isSuccess) {
  if (isSuccess) {
    resultText.innerText = `살렸습니다!`;
  } else {
    resultText.innerText = `꽥`;
    resultText.style.color = "red";
    rightAnswer.classList.remove("off");
    rightAnswer.innerText = `정답은 ${pickword} 입니다`;
  }
}

const rope = document.querySelector(".rope");
const head = document.querySelector(".head");
const body = document.querySelector(".body");
const leftArm = document.querySelector(".left-arm");
const rightArm = document.querySelector(".right-arm");
const leftLeg = document.querySelector(".left-leg");
const rightLeg = document.querySelector(".right-leg");

const bodiesArr = [head, body, leftArm, rightArm, leftLeg, rightLeg];

function printBodies(cnt) {
  switch (cnt) {
    case 1:
      rope.classList.add("on");
      break;
    case 2:
      head.classList.add("on");
      break;
    case 3:
      body.classList.add("on");
      break;
    case 4:
      leftArm.classList.add("on");
      break;
    case 5:
      rightArm.classList.add("on");
      break;
    case 6:
      leftLeg.classList.add("on");
      break;
    case 7:
      rightLeg.classList.add("on");
      break;
  }
}

// function startGame() {
//   pickRandomTitle();

// }
