import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controller/videoController";
import { protectedRoute } from "../middlewares";
import { deleteComment, postAddComment } from "../controller/commentController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, protectedRoute, postAddComment);
apiRouter.delete(routes.deleteComment, protectedRoute, deleteComment);

export default apiRouter;
