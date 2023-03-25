"use strict";
//DOM ELEMENT
const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSetting = document.getElementById("btn-submit");
// click
btnSetting.addEventListener("click", function () {
  const dataSetting = {
    pagesize: inputPagesize.value,
    category: inputCategory.value,
  };
  if (dataSetting.pagesize == "") {
    alert("nhập pagesize là một số");
  } else {
    alert("setting done");
    saveToStorage("setting", dataSetting);
    inputPagesize.value = "";
  }
  //    else if (Number(dataSetting.pagesize) == NaN) {
  //     alert("vui lòng nhập một số");
  //   }
});
