import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // user 가 존재하지 않을 경우 null 넘겨줌.
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
