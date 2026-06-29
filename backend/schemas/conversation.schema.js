import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastMessage: {
        type: String,
        default: ""
    },
    lastMessageBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lastMessageAt: {
        type: Date
    }
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } })


conversationSchema.path("lastMessageAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})

conversationSchema.path("createdAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})


conversationSchema.path("updatedAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})


const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation