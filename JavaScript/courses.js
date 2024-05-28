// courses API
let coursesApi = new XMLHttpRequest();
coursesApi.open("GET", "../API/courses.json");
coursesApi.send();
let jsObj;
coursesApi.onreadystatechange = function () {
  if (this.status === 200 && this.readyState === 4) {
    jsObj = JSON.parse(this.responseText);
    jsObj.forEach(function (ele) {
      addCourse(ele);
    });
  }
};

let coursesPage = document.querySelector(".courses-page");
function addCourse(cour) {
  let course = `
<div class="course bg-white rad-10 p-relative">
  <img class="cover" src="${cour.courseImg}" />
  <img class="teacher" src="${cour.teacherImg}" />
  <div class="text txt-cen-mobile">
    <h4 class="m-0">${cour.title}</h4>
    <p class="c-gray fs-14 mt-15 mb-15">
    ${cour.info}
    </p>
  </div>
  <div class="info p-relative between-flex">
    <span class="fs-13 c-gray">
      <i class="fa-regular fa-user"></i>
      ${cour.customers}
    </span>
    <span class="btn-shape c-white bg-blue fs-13">Course Info</span>
    <span class="fs-13 c-gray">
      <i class="fa-solid fa-dollar-sign"></i>
      ${cour.price}
    </span>
  </div>
</div>`;
  let content = document.createElement("div");
  content.innerHTML = course.trim();
  coursesPage.appendChild(content.firstChild);
}
