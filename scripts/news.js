"use strict";
//DOMELEMENT
const container = document.getElementById("news-container");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const page = document.getElementById("page-num");
//from seeting
const arrSeting = JSON.parse(getFromStorage("setting")) || [];
// SET LINK API
const category = arrSeting.category;
const apiKey = "c784a931264047a985bf0855486f9aec";
const pageSize = arrSeting.pagesize;
// BIẾN KIỂM TRA TỔNG BÀI VIẾT
let totalPoss;
//STRART
if (page.textContent === "1") btnPrevious.hidden = true;
else btnPrevious.hidden = false;
container.innerHTML = "";
// lấy dữ liệu từ API
const News = async function (country, category, pageSize, apiKey, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`
    );
    if (!res.ok) throw new Error(`lỗi ${res.status}`);
    const apiData = await res.json();
    const data = apiData.articles;
    totalPoss = apiData.totalResults;
    renderData(data);
  } catch (err) {
    container.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `<h3> không thể kết nối tới server, vui lòng thử lại</h3>
  <h4>${err.message}</h4>`;
    container.appendChild(div);
    btnNext.hidden = true;
  }
};
// HÀM RENDERDATA
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
News("us", category, pageSize, apiKey);
// HÀM ACTIVE NÚT ẤN
function hideBtn() {
  if (page.textContent === "1") btnPrevious.hidden = true;
  else btnPrevious.hidden = false;
  if (page.textContent * pageSize >= totalPoss) btnNext.hidden = true;
  else btnNext.hidden = false;
}

//NÚt btnPrevious
btnPrevious.addEventListener("click", function () {
  page.textContent--;
  News("us", category, pageSize, apiKey, page.textContent);
  hideBtn();
});
//NUST NEXT
btnNext.addEventListener("click", function () {
  page.textContent++;
  News("us", category, pageSize, apiKey, page.textContent);
  hideBtn();
});
