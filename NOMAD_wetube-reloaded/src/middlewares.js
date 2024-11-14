import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  /**
   * res.locals.loggedIn = Boolean(req.session.loggedIn) => 숏컷
   * if (res.locals.loggedIn) {
   *  req.session.loggedIn = true
   * }
   */
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 하지 않은 사람들만 접근할 수 있는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000, // 3MB
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000, // 10MB
  },
});
