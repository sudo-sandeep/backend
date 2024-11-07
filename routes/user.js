import { Router } from "express";
import { LOGIN, SIGNUP,LOGOUT } from "../controllers/user.js";
import { LOGIN_SCHEMA,SIGNUP_SCHEMA } from "../validators/auth.js";
import { validateSchema } from "../utils/functions.js";
import {verifyJWT} from '../middlewares/auth.js'

const authRouter = Router();

authRouter.post("/login",validateSchema(LOGIN_SCHEMA), LOGIN);
authRouter.post("/register",validateSchema(SIGNUP_SCHEMA), SIGNUP);
authRouter.get("/logout",verifyJWT, LOGOUT);

export default authRouter;