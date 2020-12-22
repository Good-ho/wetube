import multer from "multer";
import multerS3 from "multer-s3"
import aws from "aws-sdk";
import routes from "./routes";
import formatTime from "./utils/formatTime";

const s3 = new aws.S3({
  accessKeyId:process.env.AWS_KEY,
  secretAccessKey:process.env.AWS_PRIVATE_KEY,
  region:"ap-northeast-2"
})

const multerVideo = multer({
  storage:multerS3({
    s3,
    acl:"public-read",
    bucket:"puwetube/video"
  })
});

const multerAvatar = multer({
  storage:multerS3({
    s3,
    acl:"public-read",
    bucket:"puwetube/avatar"
  })
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

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


