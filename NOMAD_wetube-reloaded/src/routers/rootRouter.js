import express from "express";
import { getJoin, postJoin, login } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login); // function과 url 이름이 같을 필요는 없다
rootRouter.get("/search", search);

export default rootRouter;
