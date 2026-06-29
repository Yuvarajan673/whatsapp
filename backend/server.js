import express from "express"
import cors from "cors"
import { authRouter } from "./routers/auth.router.js"
import { userRouter } from "./routers/user.router.js"
import { messageRouter } from "./routers/message.router.js"
import cookieParser from "cookie-parser"
import { PORT } from "./config/env.config.js"
import { initSocket } from "./socket.js"
import "./config/db.config.js"
import { conversationRouter } from "./routers/conversation.router.js"



// Initializing app object
const app = express()



// Registering Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5001"],
    credentials: true
}))


// Registering Routers
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/conversations", conversationRouter)
app.use('/messages', messageRouter)



// Allocate Port for the Node server to listen
export const expressServer = app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})




initSocket(expressServer)







