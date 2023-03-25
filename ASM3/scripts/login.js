"use strict";
//DOMELEMENT
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");
// lấy mảng từ localstorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);
btnLogin.addEventListener("click", function () {
  // lấy lữ liệu từ người dùng

  const userName = inputUserName.value;
  const passWork = inputPassWord.value;
  //vailidate
  if (userName && passWork) {
    //kiểm tra username
    function checkname(nam) {
      return nam.username == userName;
    }
    let currentUser = [];
    currentUser = userArr.find(checkname);

    // nếu không tên nào được tìm thấy
    if (currentUser == undefined) {
      alert("tài khoản này chưa được đăng kí");
    } else {
      if (currentUser.password === passWork) {
        // hoàn thành việc đăng nhập
        saveToStorage("login", currentUser);
        window.location.href = "../index.html";
      } else {
        alert("mật khẩu không đúng ,vui lòng nhập lại");
      }
    }
  } else {
    alert("vui lòng điền đầy đủ thông tin");
  }
});
