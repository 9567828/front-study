import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
// 어느 url로든 작동하도록 해준다 use가 get보다 위로 와야한다.
app.use(logger);

// express가 만들어진 이후의 코드가 들어가야 할 자리 express와 연관된 코드들
// application 설정

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// 누군가 요청을 보내면 반응하는 콜백함수를 주겠다 (home:root)으로 get request를 보내면 답을 주겠다.

// 외부 개방
const handleListening = () => console.log(`server listening on port http://localhost:${PORT} 👍`);

app.listen(PORT, handleListening);
