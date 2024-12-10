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
    req.flash("error", "로그인부터 하시오");
    return res.redirect("/login");
  }
};

// 로그인 하지 않은 사람들만 접근할 수 있는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그아웃 부터 하시오");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000, // 3MB
  },
});

export const thumbNailUpload = multer({
  dest: "uploads/thumb/",
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

// export const handleFileSizeError = (err, req, res, next, pagename, pagetitle) => {
//   if (err && err.code === "LIMIT_FILE_SIZE") {
//     return res.status(400).render(pagename, {
//       pageTitle: pagetitle,
//       errorMessage: "The file is too large. Max size is 10MB.",
//     });
//   }
//   next(err); // 다른 에러는 그대로 처리
// };

export const handleFileSizeError = (err, req, res, next, page) => {
  if (err && err.code === "LIMIT_FILE_SIZE") {
    req.flash("error", "파일 사이즈는 10MB 미만입니다.");
    return res.status(400).redirect(page);
  }
  next(err); // 다른 에러는 그대로 처리
};

export const arrowMic = (req, res, next) => {
  res.set("Permissions-Policy", 'microphone=(self "https://developer.mozilla.org")');
  next();
};
