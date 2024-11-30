import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, requierd: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // 누가 작성했냐
  video: { type: mongoose.Schema.Types.ObjectId, requierd: true, ref: "Video" }, // 어떤 비디오에 작성했냐
  createdAt: { type: Date, required: true, default: Date.now },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
