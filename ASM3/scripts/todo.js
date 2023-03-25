"use strict";
//DOM ELEMENT
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const tableEl = document.getElementById("todo-list");
// LẤY DỮ LIỀU NGƯỜI DÙNG LOGIN
const loginData = JSON.parse(getFromStorage("login")) || [];
const arrTodo = JSON.parse(getFromStorage("todolist")) || [];
//start
tableEl.innerHTML = "";
renderTodo(arrTodo);
//deleteTask funtion
function deleteTask(i) {
  arrTodo.splice(i, 1);
  saveToStorage("todolist", arrTodo);
  renderTodo(arrTodo);
}
//render todolist
function renderTodo(arr) {
  tableEl.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].owner === loginData.username) {
      const li = document.createElement("li");
      li.className = `${arr[i].isDone == true ? "checked" : ""}`;
      li.innerHTML = `${arr[i].task}<span class="close" onclick='deleteTask(${i})'>×</span></li>`;
      tableEl.appendChild(li);
      li.addEventListener("click", function () {
        li.classList.toggle("checked");
        if (arr.length == 0) return; // nếu xóa hết arrtodo thì arr[i].isDone sẽ không xác định
        li.classList.contains("checked")
          ? (arr[i].isDone = true)
          : (arr[i].isDone = false);
        saveToStorage("todolist", arrTodo);
      });
    }
  }
}
btnAdd.addEventListener("click", function () {
  //lay du lieu
  const dataTodo = {
    task: inputTask.value,
    owner: loginData.username,
    isDone: false,
  };
  if (loginData.length == 0) {
    alert("vui lòng đăng nhập");
  } else if (dataTodo.task == "") {
    alert("nhập việc cần làm");
  } else {
    const insTance = new Task(dataTodo.task, dataTodo.owner, dataTodo.isDone);
    arrTodo.push(insTance);
    saveToStorage("todolist", arrTodo);
    renderTodo(arrTodo);
  }
});
