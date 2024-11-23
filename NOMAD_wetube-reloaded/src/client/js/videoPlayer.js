const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("full-screen");
const videoContainer = document.getElementById("video-container");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  // 비디오가 재생 중 이면 일시정지
  if (video.paused) {
    video.play();
  } else {
    // 아니면 비디오 재생
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  // range에 설정한 볼륨 값을 수정한다
  volumeValue = value;
  // 위에서 설정한 let volumeValue 에 따라서 수정이 되고 value값에 따라서 업데이트가 된다
  video.volume = value;
  muteBtn.innerText = value === "0" ? "Unmute" : "Mute";
};

// const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);

const setTime = (time, text) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = Math.floor(time % 60);
  if (hour === 0) {
    text.innerText = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  } else {
    text.innerText = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
};

const handleLoadedMetaData = () => {
  setTime(Math.floor(video.duration), totalTime);
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  setTime(Math.floor(video.currentTime), currentTime);
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "풀";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "풀 끄기";
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
