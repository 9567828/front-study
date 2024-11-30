const videoContainer = document.getElementById("video-container");
const form = document.getElementById("comment-form");

const handleSubmit = (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: { text },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
