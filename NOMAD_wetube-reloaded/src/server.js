import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("");

// express가 만들어진 이후의 코드가 들어가야 할 자리 express와 연관된 코드들
// application 설정
const home = (req, res) => {
  console.log("i'm respond");
  return res.send("나는 미들웨어를 좋아햐");
};

const login = (req, res) => {
  return res.send("login");
};

// 어느 url로든 작동하도록 해준다 use가 get보다 위로 와야한다.
// 누군가 요청을 보내면 반응하는 콜백함수를 주겠다 (home:root)으로 get request를 보내면 답을 주겠다
app.use(logger);
app.get("/", home);
app.get("/login", login);

// 외부 개방
const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT} 👍`);

app.listen(PORT, handleListening);
