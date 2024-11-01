import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetubeDB");

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
// once는 한번만 알려주는 것, db 연결이 됐을 때 한 번 알려준다 (on은 여러번 알려준다 error를  보기에 좋은 것)
db.once("open", handleOpen);
