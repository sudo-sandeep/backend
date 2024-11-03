import { Router } from "express";
import { LOGIN, SIGNUP } from "../controllers/auth";
import { LOGIN_SCHEMA,SIGNUP_SCHEMA } from "../validators/auth";

const authRouter = Router();

authRouter.post("/login", LOGIN);
authRouter.post("/signup", SIGNUP);

export default authRouter;