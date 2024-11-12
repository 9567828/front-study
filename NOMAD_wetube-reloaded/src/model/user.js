import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
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
});

userSchema.pre("save", async function () {
  if (this.password && this.password !== "") {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const user = mongoose.model("User", userSchema);
export default user;
