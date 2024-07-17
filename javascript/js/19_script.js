const lis = document.querySelectorAll("li")

// 5초 뒤에 적용 되어라~ (5000)
const timeout1 = window.setTimeout(() => {
    lis.forEach(li => {
        li.style.color = "tomato";
        // li.style.backgroundColor = "black";
    })
}, 5000);

const getRandomColor = () => `#${Math.floor(Math.random() * (0xffffff + 1))}`

const interval1 = window.setInterval(() => {
    lis.forEach(li => {
        li.style.backgroundColor = getRandomColor()
    })
}, 500)

// clearTimeout() : 전달한 타임아웃을 삭제한다
function stopTimeout() {
    window.clearTimeout(timeout1)
}

// clearInterval() : 전달한 인터벌을 삭제한다
function stopInterval() {
    window.clearInterval(interval1);
}