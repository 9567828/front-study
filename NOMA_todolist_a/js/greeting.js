const h1 = document.querySelector("#greeting");
const loginFrom = document.querySelector("#login_form");
const loginInput = document.querySelector("#login_form input");
const btn = document.querySelector("#btn");
const TodoList = document.querySelector("#todo");
const Quote = document.querySelector("#quote");

const HIDDEN = "hidden";
const USERNAME_KEY = "username";
const ON = "on";

function onLoginSubmit(event) {
  event.preventDefault();
  loginFrom.classList.add(HIDDEN);

  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
}

function paintGreeting(username) {
  h1.innerText = `반갑습니다:) ${username}님!`;
  h1.classList.remove(HIDDEN);
  TodoList.classList.remove(HIDDEN);
  Quote.classList.add(ON);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginFrom.classList.remove(HIDDEN);
  loginFrom.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}

let idCheck = false;

function activeEvent() {
  switch (!loginInput.value) {
    case true:
      btn.disabled = true;
      break;
    case false:
      btn.disabled = false;
      break;
  }
}

loginInput.addEventListener("keyup", activeEvent);
