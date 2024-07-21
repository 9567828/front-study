import express from "express";

const PORT = 4000;

const app = express();

// express가 만들어진 이후의 코드가 들어가야 할 자리 express와 연관된 코드들
// application 설정

// 누군가 요청을 보내면 반응하는 콜백함수를 주겠다 (home:root)으로 get request를 보내면 답을 주겠다
const handleHome = () => console.log("Somebody is trying to go home.");

app.get("/", handleHome);

// 외부 개방
const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT} 👍`);

app.listen(PORT, handleListening);
