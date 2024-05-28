// friends API
let friendsApi = new XMLHttpRequest();
friendsApi.open("GET", "../API/friends.json");
friendsApi.send();
let jsObj;
friendsApi.onreadystatechange = function () {
  if (this.status === 200 && this.readyState === 4) {
    jsObj = JSON.parse(this.responseText);
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
        <i class="number fa-solid fa-phone" data-num="${person.phoneNumber}"></i>
        <i class="email fa-regular fa-envelope data-email=${person.email}"></i>
      </div>
      <div class="txt-cen">
        <img class="avatar rad-half mt-10 mb-10" src="${person.img}" alt="" />
        <h4 class="name m-0">${person.name}</h4>
        <p class="career mt-10 mb-15 c-gray fs-13">${person.career}</p>
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
          <a class="profile-friend btn-shape c-white bg-blue" href="#">Profile</a>
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
      }
    });
  });

  // show friend profile
  let profileButtons = document.querySelectorAll(".profile-friend");
  // Loop through each button and attach a click event listener
  profileButtons.forEach(function (profileButton) {
    profileButton.addEventListener("click", function (event) {
      let friendIndex = Array.from(profileButtons).indexOf(profileButton);
      let clickedPerson = jsObj[friendIndex];
      friendPopup(clickedPerson);
      popup.style.display = "block";
      event.preventDefault();
    });
  });
}
// get the popup element from HTML
let popup = document.querySelector(".popup");
// create the popup of the friend that been clicked
function friendPopup(person) {
  let createPopup = `
<div class="model">
  <div class="info">
    <img class="rad-half" src="${person.img}" alt="" />
    <div>
      <h2 class="mt-0 mb-10">${person.name}</h2>
      <div class="fs-15 c-gray">${person.career}</div>
    </div>
  </div>
  <div class="contact">
    <h4>Contact</h4>
    <div>
      <span>Number:</span>
      <span>${person.phoneNumber}</span>
    </div>
    <div>
      <span>Email:</span>
      <span>${person.email}</span>
    </div>
  </div>
  <div class="skills">
    <h4>Skills</h4>
    <ul>
      ${friendSkills(person.skills)}
    </ul>
  </div>
  <button class="close">X</button>
</div>`;
  popup.innerHTML = createPopup;
  // close popup
  let closePopup = document.querySelectorAll(".popup .model .close");
  closePopup.forEach(function (ele) {
    ele.addEventListener("click", function () {
      let popup = this.closest(".popup");
      popup.style.display = "none";
    });
  });
}
// add friend skills to his popup
function friendSkills(arr) {
  let skills = "";
  arr.forEach(function (ele) {
    skills += `<li class="btn-shape bg-eee w-fit">${ele}</li>`;
  });
  return skills;
}
