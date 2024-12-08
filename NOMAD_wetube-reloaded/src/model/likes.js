import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createAt: { type: Date, required: true, default: Date.now },
});

const likeModel = mongoose.model("Like", likeSchema);

export default likeModel;
