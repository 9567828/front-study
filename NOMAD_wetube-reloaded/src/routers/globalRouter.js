import express from "express";
import { join, login } from "../controllers/userControllers";
import { trending, search } from "../controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login); // function과 url 이름이 같을 필요는 없다
globalRouter.get("/search", search);

export default globalRouter;
