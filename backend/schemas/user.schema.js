import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } })


userSchema.path("createdAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})

userSchema.path("updatedAt").get(function (v) {
    return v ? v.toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) : null
})





const User = mongoose.model('User', userSchema)
export default User