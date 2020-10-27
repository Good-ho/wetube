import express from "express";
import { join, login, logout } from "../controller/userController";
import { home, search } from "../controller/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;