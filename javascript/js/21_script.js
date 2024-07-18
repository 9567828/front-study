// window.console~ 콘솔앞에 window.이 생략 된 것이다
console.dir(window)

// window 생략이 가능한 애들
// window.alert('경고창!')
// window.prompt('입력창~')
// window.confirm("확인창~")

console.dir(window.screen)
console.dir(window.history)
console.dir(window.document)
console.dir(window.location)
console.dir(window.navigator)


// 웹브라우저가 표시되는 모니터에 관한 정보
console.dir(window.screen.availWidth) // 사용가능한 너비
console.dir(window.screen.availHeight) // 사용가능한 높이 (작업표시줄 제외)
console.dir(window.screen.width) // 전체 너비
console.dir(window.screen.height) // 전체 높이(작업표시줄 포함)

console.dir(window.history.length) // 웹페이지 이동 내역의 길이

// 뒤로가기 기능
// (window.history.back());

function goBack() {
    window.history.back()
}

function goForward() {
    window.history.forward();
}

const inputPage = document.querySelector("#input-page")
function go() {
    window.history.go(inputPage.value)
}

console.log(window.location.href) // 현재위치
console.log(typeof window.location.href)
console.log(window.location.protocol) // 해당 경로에서 프로토콜을 의미하는 곳
console.log(window.location.host) // 해당 경로에서 웹 서버의 주소를 의미하는 곳
console.log(window.location.port) // 해당 경로에서 포트번호를 의미하는 곳
console.log(window.location.pathname) // 해당 경로에서 URI 를 의마하는 곳