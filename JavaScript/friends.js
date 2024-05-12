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
}
