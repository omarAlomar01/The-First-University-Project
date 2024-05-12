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
