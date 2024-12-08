const videoContainer = document.getElementById("video-container");
const likeNumber = document.querySelector(".like-number");

const likeBtn = document.querySelector(".like-btn");

const countLike = async (e) => {
  const videoId = videoContainer.dataset.id;
  const likeId = e.target.dataset.likeid;

  let currentLikeCount = parseInt(likeNumber.innerText);
  const updateLikeCount = currentLikeCount + 1;
  const cancelCount = currentLikeCount - 1;

  const response = await fetch(`/api/videos/${videoId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 201) {
    const { newLikeId } = await response.json();
    likeNumber.innerText = updateLikeCount;
    likeBtn.dataset.likeid = newLikeId;
    likeBtn.classList.add("on");
  } else {
    const response = await fetch(`/api/like/${likeId}/cancel`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    });
    if (response.status === 205) {
      likeNumber.innerText = cancelCount;
      likeBtn.classList.remove("on");
      e.target.removeAttribute("data-likeid");
    }
  }
};

likeBtn.addEventListener("click", countLike);
