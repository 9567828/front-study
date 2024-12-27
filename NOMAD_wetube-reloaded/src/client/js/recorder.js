import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const BODY = document.body;
const actionBtn = document.getElementById("action-btn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileURL, filename) => {
  const a = document.createElement("a");
  a.href = fileURL;
  a.download = filename;
  BODY.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "변환중..";
  actionBtn.disabled = true;

  // log: true -> 콘솔에 로그를 출력한다
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });

  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));

  await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);

  // -ss 스크린샷, 01초로 이동, 첫번째 프레임을 1번 찍는다
  await ffmpeg.exec(["-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb]);

  const mp4File = await ffmpeg.readFile(files.output);
  const thumbFile = await ffmpeg.readFile(files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4URL = URL.createObjectURL(mp4Blob);
  const thumbURL = URL.createObjectURL(thumbBlob);

  // 이전 버전 코드
  // // 저장할 폴더명, 저장할 파일명, 가져올 URL
  // ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  // // -i > input, 인코딩할 파일명, 초당 60프레임"60"으로 인코딩"-r", output 될 파일명
  // await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  downloadFile(mp4URL, "내녹화파일.mp4");
  downloadFile(thumbURL, "썸네일.jpg");

  const deletFiles = await ffmpeg.deleteFile(files.output, files.thumb);

  console.log(deletFiles);

  URL.revokeObjectURL(mp4URL);
  URL.revokeObjectURL(thumbURL);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "다시녹화";
  init();
  actionBtn.removeEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "다운로드비디오";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "녹화중지";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);

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

let errorMessage = "";

const init = async () => {
  try {
    stream = await window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 200, height: 100 },
    });
    video.srcObject = stream;
    video.play();

    actionBtn.addEventListener("click", handleStart);
  } catch (error) {
    if (error.name === "NotAllowedError" && error.message === "Permission denied") {
      errorMessage = "카메라, 마이크를 허용하지 않으면 \n이용에 제한이 있습니다";
      // const response = await fetch(`/api/videos/recorder/error`, {
      //   method: "PUT",
      //   headers: { "Content-type": "application/json" },
      //   // body: JSON.stringify({ errorMessage }),
      // });
      // if (response.status === 301) {
      handleError(errorMessage);
    }
    if (error.name === "NotFoundError") {
      errorMessage = "카메라, 마이크를 찾을 수 없습니다 \n 녹화를 사용할 수 없습니다.";
      handleError(errorMessage);
    }
  }
};

init();
