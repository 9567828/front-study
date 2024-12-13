import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoControllers";
import { protectorMiddleware, videoUpload, handleFileSizeError, arrowMic } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    (err, req, res, next) => {
      const {
        params: { id },
      } = req;
      handleFileSizeError(err, req, res, next, `/videos/${id}/edit`);
    },
    postEdit
  );
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(arrowMic, getUpload)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    (err, req, res, next) => {
      handleFileSizeError(err, req, res, next, "/videos/upload");
    },
    postUpload
  );

export default videoRouter;
