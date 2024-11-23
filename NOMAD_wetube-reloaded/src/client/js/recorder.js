const startBtn = document.getElementById("start-btn");

const handleStart = async () => {
  try {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const devices = await navigator.mediaDevices.enumerateDevices();
  //   console.log(devices);
  // } catch (error) {
  //   console.log(error);
  // }
};

startBtn.addEventListener("click", handleStart);
