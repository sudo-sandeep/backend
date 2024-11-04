import { Router } from "express";
import { LOGIN, SIGNUP } from "../controllers/auth.js";
import { LOGIN_SCHEMA,SIGNUP_SCHEMA } from "../validators/auth.js";

const authRouter = Router();

authRouter.post("/login", LOGIN);
authRouter.post("/signup", SIGNUP);

export default authRouter;