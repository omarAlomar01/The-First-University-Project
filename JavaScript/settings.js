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
