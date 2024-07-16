// DOM 객체
console.dir(document)

// ID로 선택하는 경우 하나만 선택해서 가져올 수 있다
const div3 = document.getElementById("div3")

console.log(div3)

// 여러 요소를 선택하는 메서드는 HTMLCollection 타입으로 가져온다
const importants = document.getElementsByClassName("important")
const divs = document.getElementsByTagName("div");
console.dir(importants)
console.dir(divs)

// HTMLCollection은 배열이 아니기 때문에 forEach, map, filter등을 활용할 수 없다
console.dir(divs[0])
console.dir(divs[1])
console.dir(divs[2])
console.dir(divs[3])

// forEach를 활용하기 위해서는 배열로 변환해야 한다
Array.from(divs).forEach(div => console.log('foreach', div));

// 자바스크립트에서 CSS선택자로 요소 선택하기
const div2 = document.querySelector("#div2");
console.log(div2)

const boxs = document.querySelectorAll(".box");
console.log(boxs)

boxs.forEach(box => console.log(box));

// NodeList 타입도 Array.from()으로 배열로 변환할 수 있다
const filterd = Array.from(boxs).filter(box => box.classList.contains("important"))
console.log('필터결과: ', filterd)

const div1 = document.querySelector("#div1")
console.dir(div1)

div1.innerHTML = `<b>자바스크립트에서 추가한 내용</b>`;
div2.innerText = `<b>자바스크립트에서 추가한 내용</b>`;


const img1 = document.querySelector("#img1")
console.dir(img1)

// 선택한 요소의 속성값을 쉽게 변경할 수 있다
img1.alt = "토토로 친구";
img1.src = "../img/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg";
img1.width = "300";
img1.height = "200";

// 속성을 직접 변경해도 되지만 메서드를 활용해 변경할 수 도 있다
img1.setAttribute("src", "../img/갱애지.jpg");
img1.setAttribute("alt", "바보같은 갱애지")
// px은 style 속성을 변경해야 px이 들어간다
img1.setAttribute("width", "500")
img1.setAttribute("style", "height: 300px")

// 해당 요소의 클래스 속성을 직접 수정하기
// (클래스는 민감한 단어이기 때문에 속성 이름으로 className을 사용한다)
img1.className = "border visible box big-image";

const img2 = document.querySelector("#img2")
img2.setAttribute("width", "500")
img2.setAttribute("heighth", "500")

// invisible 클래스를 visible로 변경
console.log(img2.className)
// 문자열 메서드를 활용해 수정 할 수는 있지만 매우 불안한 작업이다  
img2.className = img2.className.replace("invisible", "visible");

console.dir(img2)

// 요소.classList : 해당 요소의 클래스를 리스트 형태로 다룰 수 있다
img2.classList.remove("invisible");
img2.classList.add("visible");