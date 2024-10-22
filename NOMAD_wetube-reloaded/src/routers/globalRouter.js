import express from "express";

const globalRouter = express.Router();

const handelHome = (req, res) => res.send("home");

globalRouter.get("/", handelHome);

export default globalRouter;
