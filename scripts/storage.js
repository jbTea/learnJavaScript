"use strict";
//lưu và chuyển đổi arrpet sang string
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// lấy lại giá trị
function getFromStorage(key) {
  return localStorage.getItem(key);
}
