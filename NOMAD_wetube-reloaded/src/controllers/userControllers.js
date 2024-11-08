import userModel from "../model/user";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  await userModel.create({
    name,
    email,
    username,
    password,
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
