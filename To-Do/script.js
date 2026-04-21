let todos = [];
let saved = localStorage.getItem("todos");
if (saved !== null) {
  todos = JSON.parse(saved);
}
let filter = "all";
function addTask() {
  let input = document.getElementById("todo-input");
  let text = input.value.trim();
  if (text === "") return;

  let task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(task);
  saveTasks();
  showTasks();
  input.value = "";
}
document.getElementById("todo-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});
function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTask(id) {
  let newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newTodos.push(todos[i]);
    }
  }
  todos = newTodos;
  saveTasks();
  showTasks();
}
function toggleTask(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = !todos[i].completed;
    }
  }
  saveTasks();
  showTasks();
}

function filterTasks(type) {
  filter = type;
  document.getElementById("filter-all").classList.remove("active");
  document.getElementById("filter-active").classList.remove("active");
  document.getElementById("filter-completed").classList.remove("active");
  document.getElementById("filter-" + type).classList.add("active");

  showTasks();
}
function showTasks() {
  let list = document.getElementById("todoList");
  let emptyMsg = document.getElementById("empty-msg");
  list.innerHTML = "";
  let count = 0;
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    if (filter === "active" && todo.completed) continue;
    if (filter === "completed" && !todo.completed) continue;
    count++;
    let li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("done");
    }
    let span = document.createElement("span");
    span.innerText = todo.text;

    let completeBtn = document.createElement("button");
    if (todo.completed) {
      completeBtn.innerText = "↩ Undo";
      completeBtn.className = "btn-undo";
    } else {
      completeBtn.innerText = "✓ Done";
      completeBtn.className = "btn-complete";
    }
    completeBtn.onclick = function() {
      toggleTask(todo.id);
    };
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✕ Delete";
    deleteBtn.className = "btn-delete";
    deleteBtn.onclick = function() {
      deleteTask(todo.id);
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  if (count === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

showTasks();