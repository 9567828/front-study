import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  // {type: String} 과 같다 String 만 적은 것은 shortcut
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const movieModel = mongoose.model("Video", videoSchema);

export default movieModel;
