"use strict";
//DOM ELEMEMT
const btnRegister = document.getElementById("btn-submit");
const inputFitsName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const inputconfirmPassword = document.getElementById("input-password-confirm");
// lấy mảng từ localstorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
//biến vailidate
let eightcharecter, confirmpasss, totalbolean;
let id = [];
//bắt sự kiện
btnRegister.addEventListener("click", function () {
  // lấy dữ liệu
  const data = {
    fitsName: inputFitsName.value,
    lastName: inputLastName.value,
    userName: inputUserName.value,
    passWord: inputPassWord.value,
    comfirmPassword: inputconfirmPassword.value,
  };
  //VAILIDATE dữ LIỆU
  function vailidate() {
    // check input
    if (
      data.fitsName &&
      data.lastName &&
      data.userName &&
      data.passWord &&
      data.comfirmPassword
    ) {
      // pass và confimpass phải giống nhau
      if (data.passWord === data.comfirmPassword) {
        confirmpasss = true;
      } else {
        confirmpasss = false;
        alert("passWord và comfirmPassword phải giống nhau");
      }
      //pass phải có nhiều hơn 8 kí tự
      if (data.passWord.length < 8) {
        eightcharecter = false;
        alert("mật khẩu phải có nhiều hơn 8 kí tự");
      } else {
        eightcharecter = true;
      }
      // check trùng id
      totalbolean = eightcharecter && confirmpasss;
      if (totalbolean === true) {
        if (id.includes(data.userName)) {
          alert("tên này đã có người sử dụng");
        } else {
          id.push(data.userName);
          // khởi tạo người dùng
          const user = new User(
            data.fitsName,
            data.lastName,
            data.userName,
            data.passWord
          );
          userArr.push(user);
          saveToStorage(KEY, userArr);
          window.location.href = "../pages/login.html";
        }
      }
    } else {
      alert("vui lòng điền đầy đủ thông tin");
    }
  }
  vailidate(data);
});
