import { Router } from "express";
import messageControllers from "../controllers/message.controller.js";


export const messageRouter = Router()



messageRouter.post('/all', messageControllers.getAllMessages)