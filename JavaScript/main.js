// set header width dynamically in all files
function setHeaderWidth() {
  let bodyWidth = document.body.clientWidth;
  let sidebarWidth = document.querySelector(".sidebar").offsetWidth;
  let myHeader = document.querySelector(".content header");
  let headerWidth = bodyWidth - sidebarWidth;
  myHeader.style.width = headerWidth + "px";
}
setHeaderWidth(); //on page load
window.addEventListener("resize", () => {
  //if page width changed or resized
  setHeaderWidth();
});

// yearly target variables in index file
let yearlyTarget = document.querySelector(".yearly-targets");
let progress = document.querySelectorAll(
  ".yearly-targets .details .progress > span"
);
let progressCount = document.querySelectorAll(
  ".yearly-targets .details .progress > span span"
);

window.onscroll = function () {
  // yearly target progress fil animation
  if (window.scrollY >= yearlyTarget.offsetTop - 400) {
    progress.forEach((ele, i) => {
      ele.style.width = ele.dataset.width;
      progressCount[i].textContent = progress[i].dataset.width;
    });
  }
};

// change box border color in settings file
let inputs = document.querySelectorAll(".social-info .box input");
let icon = document.querySelectorAll(".social-info .box  i");

inputs.forEach((input, index) => {
  input.addEventListener("focus", function () {
    if (this.classList.contains("facebook")) {
      this.parentNode.style.borderColor = "#1877f2";
      icon[index].style.borderColor = "#1877f2";
      icon[index].style.color = "#1877f2";
    } else if (this.classList.contains("x-twitter")) {
      this.parentNode.style.borderColor = "#000";
      icon[index].style.borderColor = "#000";
      icon[index].style.color = "#000";
    } else if (this.classList.contains("youtube")) {
      this.parentNode.style.borderColor = "#f00";
      icon[index].style.borderColor = "#f00";
      icon[index].style.color = "#f00";
    } else if (this.classList.contains("linkedin")) {
      this.parentNode.style.borderColor = "#0077b5";
      icon[index].style.borderColor = "#0077b5";
      icon[index].style.color = "#0077b5";
    }
  });
  input.addEventListener("blur", function () {
    this.parentNode.style.borderColor = "#ddd";
    icon.forEach((ele) => {
      ele.style.borderColor = "#ddd";
      ele.style.color = "gray";
    });
  });
});
