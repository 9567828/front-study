import userModel from "../model/user";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password1, password2, location } = req.body;
  const pageTitle = "Join";

  if (password1 !== password2) {
    return res.status(400).render("join", { pageTitle, errorMessage: "비밀번호가 일치 하지 않습니다" });
  }

  const exists = await userModel.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", { pageTitle, errorMessage: "이미 있는 username 또는 email입니다" });
  }
  try {
    await userModel.create({
      name,
      email,
      username,
      password1,
      password2,
      location,
    });
  } catch (error) {
    return res.redner("join", { pageTitle, errorMessage: error._message });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "login" });
export const postLogin = async (req, res) => {
  const { username, password1 } = req.body;
  const pageTitle = "login";
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage: "존재하지 않는 아이디입니다." });
  }
  const ok = await bcrypt.compare(password1, user.password);

  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 틀렸습니다." });
  }
  console.log("유저 로그인성공, 곧 들어온다");
  res.end();
};
export const logout = (req, res) => res.send("logout");
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const see = (req, res) => res.send("see user");
export const userProfile = (req, res) => res.send("user profile");
