let userName = localStorage.getItem("userName");

// userName이 비어있으면 입력을 받아라
while (!userName) {
    userName = prompt("사용하실 이름을 입력해주세요")
    if(userName) {
        localStorage.setItem("userName", userName)
    }
}

// 아래 삼항 연산자를 더 짧게 줄인 것
// nullish operator
let win = localStorage.getItem("win") ?? 0;
let draw = localStorage.getItem("draw") ?? 0;
let lose = localStorage.getItem("lose") ?? 0;

// 전적 기록 업데이트
// win = win ? win : 0;
// draw = draw ? draw : 0;
// lose = lose ? lose : 0;

const userChoiceDisplay = document.querySelector("#user-choice-display")
const computerChoiceDisplay = document.querySelector("#computer-choice-display")

const shapeProperties = {
    "scissors" : {"image": "url('../img/가위2.png')"},
    "rock" : {"image": "url('../img/묵2.png')"},
    "paper" : {"image": "url('../img/보2.png')"},
}

const changeShape = (e, shape) => {
    e.style.backgroundImage = shapeProperties[shape].image
}

const shapes = ['scissors', 'rock', 'paper']
const computerChoice = () => shapes[parseInt(Math.random() * shapes.length)];

// 비기면 0, user 승 1, com승 -1
const compte = (user, com) => {
    u = shapes.indexOf(user)
    c = shapes.indexOf(com)

    if (u == c) {
        return 0
    } else if ((u + 1) % shapes.length == c) {
        return -1;
    } else {
        return 1
    }
}

const updateScore = competeResult => {
    switch (competeResult) {
        case 0:
            ++draw;
            break;
        case 1:
            ++win;
            break;
        case -1:
            ++lose;
            break;
    }
    localStorage.setItem("win", win)
    localStorage.setItem("draw", draw)
    localStorage.setItem("lose", lose)
}

const scoreLabel = document.querySelector("#score-label")
const resutlLabel = document.querySelector("#result-label")

const printScore = result => {
    scoreLabel.innerText = (`${win}승 ${draw}무 ${lose}패`)
    let resultMessage;
    switch (result) {
        case 0:
            resultMessage = "비겼다"
            break;
        case 1:
            resultMessage = `${userName} 이겼다`
            break;
        case -1:
            resultMessage = "졌다"
            break;
    }
    resutlLabel.innerText = resultMessage;
}

const userChoice = (shape) => {
    const com_shape = computerChoice();
    changeShape(userChoiceDisplay, shape);
    changeShape(computerChoiceDisplay, com_shape);

    // console.log('결과: ', compte(shape, com_shape));

    let competeResult = compte(shape, com_shape);

    // 로컬스토리지에 저장시키기
    updateScore(competeResult)
    // 그다음 점수 출력
    printScore(competeResult)
}