const BODY = document.body;
const startBtn = document.getElementById("start-btn");
const video = document.getElementById("preview");

const handleError = (text) => {
  const existingMessage = document.querySelector(".message.error");

  // 만약 이미 메시지가 존재하면 새로운 메시지를 추가하지 않음
  if (existingMessage) {
    return; // 아무것도 하지 않고 종료
  }

  const div = document.createElement("div");
  div.className = "message";
  div.classList.add("error");

  const span = document.createElement("span");
  span.innerText = text;

  div.appendChild(span);
  BODY.appendChild(div);
};

const handleStart = () => {};

const init = async () => {
  try {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 200, height: 100 },
    });
    video.srcObject = stream;
    video.play();
  } catch (error) {
    if (error.name === "NotAllowedError" && error.message === "Permission denied") {
      let errorMessage = "카메라, 마이크를 허용하지 않으면 \n이용에 제한이 있습니다";
      const response = await fetch(`/api/videos/recorder/error`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        // body: JSON.stringify({ errorMessage }),
      });
      if (response.status === 301) {
        handleError(errorMessage);
      }
    }
  }
};

init();

startBtn.addEventListener("click", handleStart);
