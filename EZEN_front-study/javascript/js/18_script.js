const out = document.querySelector("#out")
const pushBtn = document.querySelector("#push-btn");
const popBtn = document.querySelector("#pop-btn");
const unshiftBtn = document.querySelector("#unshift-btn");
const shiftBtn = document.querySelector("#shift-btn");
const insertBtn = document.querySelector("#insert-btn")
const inputNth = document.querySelector("#input-nth")

let id = 0;
const makeGoogleIcon = (icon) => {
    const newSpan = document.createElement("span")
    newSpan.id = (id++).toString();
    newSpan.classList.add("material-symbols-outlined")

    const newTextNode = document.createTextNode(icon)

    // newSpan에 텍스트노드를 자식으로 붙여
    newSpan.appendChild(newTextNode);
    return newSpan
}

const getFirstIcon = () => document.querySelector("#out > :first-child")
const getLastIcon = () => document.querySelector("#out > :last-child")
const getNthIcon = n => document.querySelector(`#out > :nth-child(${n})`)

pushBtn.addEventListener('click', (e) => {
    out.appendChild(makeGoogleIcon('favorite'))
})

unshiftBtn.addEventListener('click', (e) => {
    // const firstIcon = document.querySelector("#out > :first-child")
    // out.insertBefore(makeGoogleIcon('grade'), firstIcon)
    out.prepend(makeGoogleIcon('grade'))
})

// 맨 뒷놈이 삭제되어야 한다
popBtn.addEventListener('click', (e) => {
    out.removeChild(getLastIcon())
})

shiftBtn.addEventListener('click', (e) => {
    out.removeChild(getFirstIcon())
})

insertBtn.addEventListener('click', (e) => {
    if (inputNth.value == '') {
        inputNth.value = 0;
        return
    }
    const nthIcon = getNthIcon(inputNth.value)

    if (nthIcon) {
        out.insertBefore(makeGoogleIcon('support_agent'), nthIcon)

    } else {
        alert("해당 번째에는 아이콘을 추가할 수 없습니다")
    }
})