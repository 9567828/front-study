const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_form input");
const todoList = document.getElementById("todo_list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodo();
}

function editTodo(event) {
  const checkId = event.target.id;
  const pickInput = event.target.nextElementSibling.children;

  Array.from(pickInput).forEach((input) => {
    if (checkId == input.id) {
      input.style.opacity = "1";
    }
  });
  console.log(
    localStorage.getItem(
      TODOS_KEY,
      JSON.stringify(
        toDos.forEach((todo) => {
          console.log(todo.id);
          console.log(todo.id == checkId);
        })
      )
    )
  );
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const edit = document.createElement("input");
  edit.className = "edit-check";
  edit.type = "checkbox";
  edit.id = li.id;

  edit.addEventListener("click", editTodo);

  const editWrap = document.createElement("div");
  editWrap.className = "edit-warp";
  editWrap.style.opacity = "0";
  editWrap.id = li.id;

  const editInput = document.createElement("input");
  editInput.className = "edit-input";
  editInput.type = "text";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.setAttribute = ("type", "submit");
  editBtn.textContent = "확인";

  const right = document.createElement("div");
  right.className = "todo-right";

  const txtWrap = document.createElement("div");
  txtWrap.className = "txt_wrap";
  const nowDate = document.createElement("span");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = String(date.getDate()).padStart(2, "0");
  nowDate.innerText = `${year}.${month}.${day}`;

  const span = document.createElement("span");
  span.className = "todo_text";
  span.innerText = newTodo.text;
  delIcon = document.createElement("span");
  delIcon.className = "fa-solid fa-trash-can";
  delIcon.addEventListener("click", deleteTodo);

  li.appendChild(edit);
  li.appendChild(right);
  li.appendChild(editWrap);
  right.appendChild(edit);
  right.appendChild(txtWrap);
  // li.appendChild(txtWrap);
  txtWrap.appendChild(span);
  txtWrap.appendChild(editWrap);
  editWrap.appendChild(editInput);
  editWrap.appendChild(editBtn);
  txtWrap.appendChild(nowDate);
  li.appendChild(delIcon);
  // li.appendChild(delIcon);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
