const todoForm = document.querySelector("#todo_form")
const todoInput = document.querySelector("#todo_form input")
const todoList = document.getElementById("todo_list")

const TODOS_KEY = "todos"

let toDos = [];

function saveTodo () {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteTodo (event) {
  const li = event.target.parentElement
  li.remove();

  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id))
  saveTodo()
}

function paintTodo(newTodo) {
  const li = document.createElement("li")
  li.id = newTodo.id;

  const txtWrap = document.createElement("div")
  txtWrap.className = "txt_wrap"
  const nowDate = document.createElement("span")
  const date = new Date ();
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = String(date.getDate()).padStart(2, "0")
  nowDate.innerText = `${year}.${month}.${day}`
  
  const span = document.createElement("span")
  span.className = "todo_text"
  span.innerText = newTodo.text;
  const delIcon = document.createElement("span")
  delIcon.className = "fa-solid fa-trash-can"
  delIcon.addEventListener("click", deleteTodo)

  li.appendChild(txtWrap)
  txtWrap.appendChild(span)
  txtWrap.appendChild(nowDate)
  li.appendChild(delIcon)
  todoList.appendChild(li)
}

function handleTodoSubmit (event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  }
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
}

todoForm.addEventListener("submit", handleTodoSubmit)

const savedTodos = localStorage.getItem(TODOS_KEY)
if(savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos)
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo)
}