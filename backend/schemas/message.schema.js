import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } })


messageSchema.path("createdAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})

messageSchema.path("updatedAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})


const Message = mongoose.model("Message", messageSchema)
export default Message