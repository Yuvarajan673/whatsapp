import { StatusCodes } from "http-status-codes"
import Conversation from "../schemas/conversation.schema.js"

const getAllConversations = async (req, res) => {
    const currentUserId = req.user.id
    const conversations = await Conversation.find({ 
        $and: [
            { members: { $all: [currentUserId] } },
            { lastMessage: { $ne: "" } }
        ]
     }).populate(["members", "lastMessageBy"]).sort({ createdAt: -1 })
    if (conversations) return res.status(StatusCodes.OK).json({
        message: "All Conversations Fetched",
        status: true,
        payload: conversations
    })
    else return res.status(StatusCodes.NO_CONTENT).json({
        message: "No Conversations Found"
    })
}



const createConversation = async (req, res) => {
    const currentUserId = req.user.id
    const receiverId = req.body.id

    // Finding the existing conversation between this two users
    var conversation = await Conversation.findOne({
        members: {
           $all: [currentUserId, receiverId]
        }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            type: "private",
            members: [currentUserId, receiverId],
            createdBy: currentUserId
        })
    }

    if (conversation) return res.status(StatusCodes.OK).json({
        message: "Conversation Created",
        status: true,
        payload: await conversation.populate("members")
    })
    else return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Conversation Creation Failed",
        status: false
    })
}


const conversationControllers = {
    getAllConversations,
    createConversation
}

export default conversationControllers