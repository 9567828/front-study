import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";

const rootRouter = express.Router();

// function과 url 이름이 같을 필요는 없다
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
