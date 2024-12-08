import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  githubLogin: { type: Boolean, default: false },
  googleLogin: { type: Boolean, default: false },
  kakaoLogin: { type: Boolean, default: false },
  kakaoId: {
    type: String,
    default: function () {
      return `null_${Date.now()}`;
    },
    require: function () {
      return !this.kakaoLogin;
    },
  },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.socialOnly;
    },
    default: null,
  },
  name: { type: String, required: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    if (this.password && this.password !== "") {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }
});

const user = mongoose.model("User", userSchema);
export default user;
