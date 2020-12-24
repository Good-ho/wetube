import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

let currentAvatar;
let deleteCommentBtn;

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment) => {
  const newComment = `
    <a href="/me">
    ${currentAvatar.outerHTML}
    </a>
    <div class="comment__user-data">
      <div class="comment__title">
        <a href="/me">
          <span class="comment__username">You</span>
        </a>
        <span class="comment__timestamp">Just now</span>
    </div>
    <p class="comment__content">${comment}</p>
    </div>
  `;
  const cm = document.createElement("li");
  cm.classList.add("comment");
  cm.innerHTML = newComment;
  console.log(cm);
  commentList.prepend(cm);
  increaseNumber();
};

const destroyComment = (element) => {
  const li = element.parentNode;
  commentList.removeChild(li);
};

const deleteComment = async (event) => {
  const { target } = event;
  const btnParent = target.parentNode;
  const commentId = btnParent.getAttribute("data-id");
  const { status } = await axios({
    method: "delete",
    url: `/api/${commentId}/delete`,
  });
  if (status === 200) {
    decreaseNumber();
    destroyComment(btnParent);
  }
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  // console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  currentAvatar = addCommentForm.querySelector(".comment__user");
  deleteCommentBtn = document.querySelectorAll(".canDelete");
  Array.from(deleteCommentBtn).forEach((button) =>
    button.addEventListener("click", deleteComment)
  );
}

if (addCommentForm) {
  init();
}
