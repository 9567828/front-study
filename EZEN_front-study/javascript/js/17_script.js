const div1 = document.getElementById("div1");

console.dir(div1);

// onmouseenter: 해당 요소로 마우스가 들어왔을 때 발생하는 이벤트
div1.onmouseenter = (e) => {
    console.dir(e);
    console.log('e.target', e.target);
    console.log('e.srcElemant', e.srcElement);
    console.log('e.toElemant', e.toElement);
    console.log('alt키 눌린 상탠가?', e.altkey)
    console.log('shift키 눌린 상탠가?', e.shiftkey);
    div1.innerText = "마우스가 들어왔다"
};

// addEventListener
div1.addEventListener('click', (e) => {
    console.dir(e);
    e.target.innerText = "클릭되었습니다!"
    div1.classList.toggle("on")
});

const ticTacToeShapes = ['', 'X', 'O'];
const ticTacToeValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const firstTic = document.querySelector("#tic-tac-toe > :first-child")
const second = document.querySelector("#tic-tac-toe > :nth-child(2)")
const third = document.querySelector("#tic-tac-toe > :nth-child(3)")
const forth = document.querySelector("#tic-tac-toe > :nth-child(4)")
const fifth = document.querySelector("#tic-tac-toe > :nth-child(5)")
const sixth = document.querySelector("#tic-tac-toe > :nth-child(6)")
const seventh = document.querySelector("#tic-tac-toe > :nth-child(7)")
const eight = document.querySelector("#tic-tac-toe > :nth-child(8)")
const ninth = document.querySelector("#tic-tac-toe > :nth-child(9)")

const allTics = document.querySelectorAll("#tic-tac-toe > *")

// firstTic.addEventListener('click', (e) => {
//     console.log(e)
//     firstTic.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length];
// });

// 연습: 나머지 8칸에도 똑같은 이벤트 적용하기
// second.addEventListener('click', (e) => {
//     second.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// third.addEventListener('click', (e) => {
//     third.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// forth.addEventListener('click', (e) => {
//     forth.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// fifth.addEventListener('click', (e) => {
//     fifth.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// sixth.addEventListener('click', (e) => {
//     sixth.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// seventh.addEventListener('click', (e) => {
//     seventh.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// eight.addEventListener('click', (e) => {
//     eight.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// ninth.addEventListener('click', (e) => {
//     ninth.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
// })

// allTics.forEach((list) => {
//     list.addEventListener('click', (e) => {
//         list.innerText = ticTacToeShapes[++ticTacToeValues[0] % ticTacToeShapes.length]
//     })
// })

// 풀이
const ticTackToedivs = document.querySelectorAll("#tic-tac-toe > div");

Array.from(ticTackToedivs).forEach((div, index) => {
    div.addEventListener('click', (e) => {
        div.innerText = ticTacToeShapes[++ticTacToeValues[index] % ticTacToeShapes.length]
    })
})

// 부모 요소에 이벤트 추가만으로도 자식 요소들을 모두 제어할 수 있다
const ticTacToe2 = document.getElementById("tic-tac-toe2")

ticTacToe2.addEventListener('click', (e) => {
    console.log(e.target)
    console.log('e.currentTarget', e.currentTarget)

    if (e.target.id === 'tic-tac-toe2') {
        return
    }

    const currShape = e.target.innerText;

    if (currShape === '') {
        e.target.innerText = 'X';
    } else if (currShape === 'X') {
        e.target.innerText = 'O'
    } else if (currShape === 'O') {
        e.target.innerText = '';
    }
})

const outDiv = document.getElementById("out-div");
const midDiv = document.getElementById("mid-div");
const innerDiv = document.getElementById("inner-div");

outDiv.addEventListener('click', (e) => {
    console.log('이벤트를 발생시킨 주체: ', e.target)
    console.log('이 이벤트의 주인: ', e.currentTarget)
    if (e.target === e.currentTarget) {
        alert("제일 바깥쪽 요소가 클릭됨!")
    }
})

midDiv.addEventListener('click', (e) => {
    if(e.target === e.currentTarget) {
        alert("중간 요소가 클릭됨!")
    }
})

innerDiv.addEventListener('click', (e) => {
    alert("제일 안쪽 요소가 클릭됨!")
})

const capOutDiv = document.getElementById("cap-out-div");
const capMidDiv = document.getElementById("cap-mid-div");
const capInnerDiv = document.getElementById("cap-inner-div");

// 이벤트 추가시 캡처링 단계에서 잡겠다고 설정하기 (버블링 단계에서 잡는 것이 아니다)
// (addEventListener()의 세번째 파라미터를 true로 설정하기)
capOutDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("제일 바깥쪽 div입니다")
}, true)

capMidDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("중간 div입니다")
}, true)

capInnerDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("제일 안쪽 div입니다")
}, true)


// 캡쳐링 이후에 발동될 이벤트들
capOutDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("제일 바깥쪽 div입니다")
})

capMidDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("중간 div입니다")
})

capInnerDiv.addEventListener('click', (e) => {
    console.dir(e)
    alert("제일 안쪽 div입니다")
})