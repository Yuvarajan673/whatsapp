import { Router } from "express";
import authControllers from "../controllers/auth.controller.js";


export const authRouter = Router()


authRouter.post('/login', authControllers.login)
authRouter.post('/signup', authControllers.signup)