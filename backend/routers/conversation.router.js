import { Router } from "express";
import conversationControllers from "../controllers/conversation.controller.js";
import authMiddlewares from "../middlewares/auth.middleware.js";


export const conversationRouter = Router()


conversationRouter.get("/all", authMiddlewares.checkToken, conversationControllers.getAllConversations)
conversationRouter.post('/create', authMiddlewares.checkToken, conversationControllers.createConversation)