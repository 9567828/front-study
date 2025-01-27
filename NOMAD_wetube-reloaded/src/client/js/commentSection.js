const videoContainer = document.getElementById("video-container");
const form = document.getElementById("comment-form");
const delBtn = document.querySelectorAll(".delete-comment");

const addComment = (text, id, username) => {
  const commentList = document.querySelector(".comment-list");
  const commentWarp = document.createElement("div");
  commentWarp.className = "comment-wrap";
  commentWarp.dataset.comid = id;
  const left = document.createElement("div");
  left.className = "left";
  const newCommentText = document.createElement("span");
  newCommentText.className = "comment";
  newCommentText.classList.add("text");
  newCommentText.innerText = `댓: ${text}`;
  const newCommentWriter = document.createElement("span");
  newCommentWriter.className = "comment";
  newCommentWriter.classList.add("name");
  newCommentWriter.innerText = `작성자: ${username}`;
  const deleteComment = document.createElement("a");
  deleteComment.classList.add("delete-comment");
  deleteComment.innerText = "❌";
  deleteComment.href = `/api/comment/${id}/delete`;
  // deleteComment.id = id;

  left.appendChild(newCommentText);
  left.appendChild(newCommentWriter);
  commentWarp.appendChild(left);
  commentWarp.appendChild(deleteComment);
  commentList.prepend(commentWarp);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId, newUsername } = await response.json();
    addComment(text, newCommentId, newUsername);
    textarea.value = "";
  }
};

// const handleDeleteComment = async (e) => {
//   const comId = e.target.parentElement.dataset.comid;
//   const deltarget = e.target.parentElement;
//   const response = await fetch(`/api/comment/${comId}/delete`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ comId }),
//   });
//   console.log(response);
//   if (response.status === 200) {
//     deltarget.remove();
//   }
// };

// delBtn.forEach((btn) => {
//   btn.addEventListener("click", handleDeleteComment);
// });

if (form) {
  form.addEventListener("submit", handleSubmit);
}
