import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  // {type: String} 과 같다 String 만 적은 것은 shortcut
  title: { type: String, required: true, trim: true, maxLength: 20 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, maxLength: 80 },
  // date.now에 괄호가 빠진 이유는 이 스키마를 실행할 때만 실행하기 위해서이다!
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Like" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => word.trim()) // 각 해시태그에서 공백 제거
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

videoSchema.static("replacePath", function (url) {
  return url.replace(/[\\]/g, "/");
});

const movieModel = mongoose.model("Video", videoSchema);

export default movieModel;
