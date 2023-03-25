"use strict";
//DOM ELEMENT
const div1 = document.getElementById("login-modal");
const div2 = document.getElementById("main-content");
const text = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// LẤY DATA TỪ LOCAL STORAGE
const dataLogin = JSON.parse(getFromStorage("login")) || [];
console.log(dataLogin);
//LOGIC
if (dataLogin.length == 0) {
  div2.hidden = true;
  div1.hidden = false;
} else {
  div1.hidden = true;
  div2.hidden = false;
  text.textContent = `well come ${dataLogin.firstName}`;
}
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("login");
  window.location.href = "../pages/login.html";
});
