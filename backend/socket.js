import { Server } from "socket.io"
import authHelpers from "./helpers/auth.helper.js"
import Conversation from "./schemas/conversation.schema.js"
import Message from "./schemas/message.schema.js"
import conversationControllers from "./controllers/conversation.controller.js"




export const initSocket = server => {

    // Initializing the Socket
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5000", "http://localhost:5001"],
            credentials: true
        }
    })


    // Managing Online Users
    const onlineUsers = new Map()


    // Listening for connection
    io.on("connection", socket => {
        const currentUserId = authHelpers.getUser(socket.request.headers?.cookie)?.id
        const socketId = socket.id

        socket.broadcast.emit("online-user", { 
            userId: currentUserId,
            state: 'online'
        })

        // Registering the user when they connected
        if (currentUserId && socketId) onlineUsers.set(currentUserId, socketId)
        
        // Listening for incoming messages
        socket.on("sending-message", async (data) => {

            const conversationId = data.conversationId
            const message = data.message
            const receiverId = data.receiverId

            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversationId },
                { lastMessage: message, lastMessageBy: currentUserId, lastMessageAt: Date.now() }, // Need to be update
                { returnDocument: 'after' }
            )
            
            const createdMessage = await Message.create({
                conversationId: conversationId,
                senderId: currentUserId,
                content: message
            })

            const socketMessage = await createdMessage.populate(['conversationId', 'senderId'])

            const userToBeReceive = onlineUsers.get(receiverId)
            socket.to(userToBeReceive).emit("receive-message", socketMessage) 
            io.to(onlineUsers.get(currentUserId)).emit("receive-message", socketMessage)

            
        })

        // Listening for disconnect event
        socket.on('disconnect', () => {
            setTimeout(() => {
                onlineUsers.delete(currentUserId)
                socket.broadcast.emit("online-user", { 
                userId: currentUserId,
                state: 'offline'
            }, 4000)
        })
        })

    })

}