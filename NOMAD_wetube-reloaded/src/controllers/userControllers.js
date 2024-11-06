import userModel from "../model/user";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password1, password2, location } = req.body;
  const pageTitle = "Join";

  if (password1 !== password2) {
    return res.render("join", { pageTitle, errorMessage: "비밀번호가 일치 하지 않습니다" });
  }

  const exists = await userModel.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", { pageTitle, errorMessage: "이미 있는 username 또는 email입니다" });
  }

  await userModel.create({
    name,
    email,
    username,
    password1,
    password2,
    location,
  });
  return res.redirect("/login");
};
export const login = (req, res) => res.send("login");
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
export const userProfile = (req, res) => res.send("user profile");
