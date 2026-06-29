import { Router } from "express";
import userControllers from "../controllers/user.controller.js";
import authMiddlewares from "../middlewares/auth.middleware.js";


export const userRouter = Router()



userRouter.get('/getAll', authMiddlewares.checkToken, userControllers.getAllUsers)
userRouter.get('/getUserChats/:id', authMiddlewares.checkToken, userControllers.getUserChats)
userRouter.post('/search', authMiddlewares.checkToken, userControllers.searchUser)