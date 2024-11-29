import userModel from "../model/user";
import videoModel from "../model/video";
import bcrypt from "bcrypt";

const setUserSession = (req, user) => {
  req.session.user = user;
  req.session.loggedIn = true;
};

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";

  if (password !== password2) {
    return res.status(400).render("users/join", { pageTitle, errorMessage: "비밀번호가 일치 하지 않습니다" });
  }

  const exists = await userModel.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("users/join", { pageTitle, errorMessage: "이미 있는 username 또는 email입니다" });
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
    return res.render("users/join", { pageTitle, errorMessage: error._message });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) => res.render("users/login", { pageTitle: "login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "login";

  const user = await userModel.findOne({ username, socialOnly: false });
  console.log(user);
  if (!user) {
    return res.status(400).render("users/login", { pageTitle, errorMessage: "존재하지 않는 아이디입니다." });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("users/login", { pageTitle, errorMessage: "비밀번호가 틀렸습니다." });
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
    let user = await userModel.findOne({ email: emailObj.email });
    if (!user) {
      let username = userData.login;

      const existingUsername = await userModel.findOne({ username: userData.login });
      if (existingUsername) {
        username = `${userData.login}_${Date.now()}`;
      }

      user = await userModel.create({
        avatarUrl: userData.avatarUrl,
        name: userData.name ? userData.name : "이름없음",
        socialOnly: true,
        email: emailObj.email,
        username: username,
        password: null,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
  } else {
    // render를 사용해서 오류 메시지를 템플릿에 보내는 방법을 사용하지 않고
    // redirect를 통해서 알림을 보내도록 할 것이다.
    return res.redirect("/login");
  }
};

export const startKakaoLogin = (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const redirectURI = "http://localhost:4000/users/kakao/finish";
  const config = {
    client_id: process.env.KA_CLIENTID,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}&redirect_uri=${redirectURI}`;
  return res.redirect(finalURL);
};

export const finishKakaoLogin = async (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/token";
  const redirectURI = "http://localhost:4000/users/kakao/finish";
  const code = req.query.code;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KA_CLIENTID,
    client_secret: process.env.KA_CLSECRET,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?redirect_uri=${redirectURI}&code=${code}&${params}`;

  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    })
  ).json();
  res.send(tokenRequest);
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const pageTitle = "Edit Profile";
  // 오브젝트로 넣은 문법과 아래와 같다 이것이 ES6
  // const { user } = req.session.user;
  // const { name, email, username, location } = req.body;
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  const user = await userModel.findById(_id);

  let errorName = "";
  let errorMail = "";

  if (user.username !== username) {
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      errorName = "이미 있는 username입니다.";
    }
  }

  if (user.email !== email) {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      errorMail = "이미 있는 email입니다.";
    }
  }

  if (errorName || errorMail) {
    return res.status(400).render("users/edit-profile", { pageTitle, errorName, errorMail });
  }

  try {
    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      {
        avatarUrl: file ? file.path : avatarUrl,
        name,
        email,
        username,
        location,
      },
      { returnDocument: "after" }
    );
    req.session.user = updateUser;
  } catch (error) {
    return res.render("users/edit-profile", { pageTitle, errorMessage: error._message });
  }
  return res.redirect("edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    return res.redirect("/");
  }
  res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;

  const user = await userModel.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", { pageTitle: "Change Password", errorMessage: "기존 비밀번호가 틀렸다" });
  }

  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("users/change-password", { pageTitle: "Change Password", errorMessage: "비밀번호가 일치 하지 않습니다" });
  }

  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "사용자가 없습니다." });
  }
  return res.render("users/profile", { pageTitle: `${user.name} profile`, user });
};
