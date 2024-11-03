// db 연결 (파일 자체를 연결)
import "./db";

import "./model/video";
import app from "./server";

const PORT = 4000;

// 외부 개방
const handleListening = () => console.log(`server listening on port http://localhost:${PORT} 👍`);

app.listen(PORT, handleListening);
