import { StatusCodes } from "http-status-codes"
import Message from "../schemas/message.schema.js"

const getAllMessages = async (req, res) => {

    const conversationId = req.body.conversationId

    const messages = await Message.find({ conversationId: conversationId }).populate(['conversationId', 'senderId'])
    
    if (messages.length > 0) return res.status(StatusCodes.OK).json({
        message: "Messages Fetched",
        status: true,
        payload: messages
    })
    else return res.status(StatusCodes.NOT_FOUND).json({
        message: "No Messages Found",
        status: false
    })
}



const messageControllers = {
    getAllMessages
}


export default messageControllers