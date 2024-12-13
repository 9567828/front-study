import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const BODY = document.body;
const startBtn = document.getElementById("start-btn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  // log: true -> 콘솔에 로그를 출력한다
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });

  ffmpeg.writeFile("recording.webm", await fetchFile(videoFile));

  await ffmpeg.exec(["-i", "recording.webm", "-r", "60", "output.mp4"]);

  // -ss 스크린샷, 01초로 이동, 첫번째 프레임을 1번 찍는다
  await ffmpeg.exec(["-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg"]);

  const mp4File = await ffmpeg.readFile("output.mp4");
  const thumbFile = await ffmpeg.readFile("thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4URL = URL.createObjectURL(mp4Blob);
  const thumbURL = URL.createObjectURL(thumbBlob);

  // 이전 버전 코드
  // // 저장할 폴더명, 저장할 파일명, 가져올 URL
  // ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  // // -i > input, 인코딩할 파일명, 초당 60프레임"60"으로 인코딩"-r", output 될 파일명
  // await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const a = document.createElement("a");
  a.href = mp4URL;
  a.download = "내 녹화파일";
  BODY.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbURL;
  thumbA.download = "썸네일.jpg";
  BODY.appendChild(thumbA);
  thumbA.click();
};

const handleStop = () => {
  startBtn.innerText = "다운로드비디오";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "녹화중지";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    // createObjectURL = 브라우저 메모리에서만 가능한 URL을 만들어준다
    videoFile = URL.createObjectURL(e.data);
    console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const handleError = (text) => {
  const existingMessage = document.querySelector(".message.error");

  if (existingMessage) {
    return;
  }

  const div = document.createElement("div");
  div.className = "message";
  div.classList.add("error");

  const span = document.createElement("span");
  span.innerText = text;

  div.appendChild(span);
  BODY.appendChild(div);
};

const init = async () => {
  try {
    stream = await window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 200, height: 100 },
    });
    video.srcObject = stream;
    video.play();

    startBtn.addEventListener("click", handleStart);
  } catch (error) {
    if (error.name === "NotAllowedError" && error.message === "Permission denied") {
      let errorMessage = "카메라, 마이크를 허용하지 않으면 \n이용에 제한이 있습니다";
      // const response = await fetch(`/api/videos/recorder/error`, {
      //   method: "PUT",
      //   headers: { "Content-type": "application/json" },
      //   // body: JSON.stringify({ errorMessage }),
      // });
      // if (response.status === 301) {
      handleError(errorMessage);
    }
  }
};

init();
