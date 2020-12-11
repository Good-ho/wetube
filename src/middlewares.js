import multer from "multer";
import routes from "./routes";
import formatTime from "./utils/formatTime";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // user 가 존재하지 않을 경우 null 넘겨줌.
  res.locals.loggedUser = req.user || null;
  res.locals.helpers = {
    formatTime,
  };
  next();
};

export const protectedRoute = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.login);
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
