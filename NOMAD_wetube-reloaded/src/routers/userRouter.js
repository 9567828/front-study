import express from "express";
import { edit, remove, logout, see, userProfile } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/", userProfile);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
