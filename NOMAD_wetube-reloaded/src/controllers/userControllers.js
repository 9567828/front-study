import userModel from "../model/user";
import bcrypt from "bcrypt";

const setUserSession = (req, user) => {
  req.session.user = user;
  req.session.loggedIn = true;
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";

  if (password !== password2) {
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
      password,
      location,
    });
  } catch (error) {
    return res.render("join", { pageTitle, errorMessage: error._message });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "login";

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage: "존재하지 않는 아이디입니다." });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 틀렸습니다." });
  }

  setUserSession(req, user);

  // req.session.loggedIn = true;
  // req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENTID,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENTID,
    client_secret: process.env.GH_CLSECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;

  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiURL = "https://api.github.com";
    const userData = await (
      await fetch(`${apiURL}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiURL}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect("/login");
    }
    const existingUser = await userModel.findOne({ email: emailObj.email });
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      res.redirect("/");
    } else {
      const user = await userModel.create({
        name: userData.name,
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      res.redirect("/");
    }
  } else {
    // render를 사용해서 오류 메시지를 템플릿에 보내는 방법을 사용하지 않고
    // redirect를 통해서 알림을 보내도록 할 것이다.
    return res.redirect("/login");
  }
};

export const logout = (req, res) => res.send("logout");
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const see = (req, res) => res.send("see user");
export const userProfile = (req, res) => res.send("user profile");
