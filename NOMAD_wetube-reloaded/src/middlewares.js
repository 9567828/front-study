export const localsMiddleware = (req, res, next) => {
  /**
   * res.locals.loggedIn = Boolean(req.session.loggedIn) => 숏컷
   * if (res.locals.loggedIn) {
   *  req.session.loggedIn = true
   * }
   */
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user;
  next();
};
