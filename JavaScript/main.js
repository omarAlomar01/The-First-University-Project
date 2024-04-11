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

// friends API
let friendsApi = new XMLHttpRequest();
friendsApi.open("GET", "../API/friends.json");
friendsApi.send();

friendsApi.onreadystatechange = function () {
  if (this.status === 200 && this.readyState === 4) {
    let jsObj = JSON.parse(this.responseText);
    jsObj.forEach(function (ele) {
      addFriend(ele);
    });
  }
};

let friendsPage = document.querySelector(".friends-page");
function addFriend(person) {
  let friend = `
  <div class="friend bg-white p-20 rad-10 p-relative">
    <div class="contact">
        <i class="fa-solid fa-phone" data-num="${person.phoneNumber}"></i>
        <i class="fa-regular fa-envelope data-email=${person.email}"></i>
      </div>
      <div class="txt-cen">
        <img class="rad-half mt-10 mb-10" src="${person.img}" alt="" />
        <h4 class="m-0">${person.name}</h4>
        <p class="mt-10 mb-15 c-gray fs-13">${person.career}</p>
      </div>
      <div class="icon mt-15 mb-15 pt-15 mb-15">
        <div class="mb-10 fs-13">
          <i class="fa-regular fa-face-smile"></i>
          <span>${person.friendsNumber} Friends</span>
        </div>
        <div class="mb-10 fs-13">
          <i class="fa-solid fa-list-check"></i>
          <span>${person.projectNumber}  Project</span>
        </div>
        <div class="mb-10 fs-13">
          <i class="fa-regular fa-newspaper"></i>
          <span>${person.articleNumber} Articles</span>
        </div>
      </div>
      <div class="info between-flex fs-13">
        <span class="c-gray">Joined ${person.joinDate}</span>
        <div>
          <a class="btn-shape c-white bg-blue" href="#">profile</a>
          <a class="remove-friend btn-shape c-white bg-red" href="#">Remove</a>
        </div>
      </div>
    </div>
  `;
  let content = document.createElement("div");
  content.innerHTML = friend.trim();
  friendsPage.appendChild(content.firstChild);

  // add delete event
  let removeFriends = document.querySelectorAll(
    ".friends-page .friend .info .remove-friend"
  );
  removeFriends.forEach(function (removeButton) {
    removeButton.addEventListener("click", function () {
      let friendElement = this.closest(".friend");
      if (friendElement) {
        // remove form HTML display
        friendElement.parentNode.removeChild(friendElement);
        // remove from API file
        let friendId = this.getAttribute("data-id");
        removeFromApi(friendId);
      }
    });
  });
}
function removeFromApi(friendId) {
  let deleteApi = new XMLHttpRequest();
  deleteApi.open("DELETE", apiUrl);
  deleteApi.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  deleteApi.send(JSON.stringify(requestData));
  deleteApi.onload = function () {
    if (deleteApi.status === 200) {
      console.log("Friend removed from JSON API.");
    } else {
      console.error("Failed to remove friend from JSON API.");
      // Optionally, handle error conditions here
    }
  };

  let requestData = {
    id: friendId,
    // Add any other necessary data for your API endpoint
  };

  console.log(deleteApi);
}
