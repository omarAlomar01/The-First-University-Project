// yearly target variables
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
