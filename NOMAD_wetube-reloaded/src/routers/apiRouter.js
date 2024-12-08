import express from "express";
import { registerView, registerLike, cancelLike, createComment, deleteComment } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/like", registerLike);
apiRouter.delete("/like/:id([0-9a-f]{24})/cancel", cancelLike);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.get("/comment/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
