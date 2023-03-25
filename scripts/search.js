"use strict";
//DOMELEMENT
const searchInput = document.getElementById("input-query");
const btnSearcth = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const container = document.getElementById("abc");
// BIẾN TỔNG BÀI VIẾT
let totalPoss;
//from seeting
const arrSeting = JSON.parse(getFromStorage("setting")) || [];
const pageSize = arrSeting.pagesize;
const apiKey = "c784a931264047a985bf0855486f9aec";
//start
hideBtn();
// render FUNCTION
const renderData = function (data) {
  container.innerHTML = "";
  for (let t = 0; t < data.length; t++) {
    let div = document.createElement("div");
    div.innerHTML = `<div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src='${data[t].urlToImage}'
              class="card-img"
              alt="${data[t].title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data[t].description}
                - ${data[t].author}</h5>
              <p class="card-text">${data[t].content}</p>
              <a href="${data[t].url}"
                class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>`;
    container.appendChild(div);
  }
};
// HÀM ACTIVE NÚT ẤN
function hideBtn() {
  if (pageNum.textContent === "1") btnPrev.hidden = true;
  else btnPrev.hidden = false;
  if (pageNum.textContent * pageSize >= totalPoss) btnNext.hidden = true;
  else btnNext.hidden = false;
}
// NÚT SEARCH
btnSearcth.addEventListener("click", function () {
  // TẢI API THEO INPUT
  const Searchs = async function (q, apiKey, pageSize, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) throw new Error(`lỗi ${res.status}`);
      const apiData = await res.json();
      totalPoss = apiData.totalResults;
      renderData(apiData.articles);
      console.log(apiData);
    } catch (err) {
      container.innerHTML = "";
      let div = document.createElement("div");
      div.innerHTML = `<h3> không thể kết nối tới server, vui lòng thử lại</h3>
      <h4>${err.message}</h4>`;
      container.appendChild(div);
      btnNext.hidden = true;
    }
  };
  Searchs(searchInput.value, apiKey, pageSize, pageNum.textContent);
  //NÚt btnPrev
  btnPrev.addEventListener("click", function () {
    pageNum.textContent--;
    Searchs(searchInput.value, apiKey, pageSize, pageNum.textContent);
    hideBtn();
  });
  //NUST NEXT
  btnNext.addEventListener("click", function () {
    pageNum.textContent++;
    Searchs(searchInput.value, apiKey, pageSize, pageNum.textContent);
    hideBtn();
  });
});
