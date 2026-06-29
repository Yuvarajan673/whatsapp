import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/env.config.js"

const generateToken = (payload) => {
    const { _id, name, username } = payload
    return jwt.sign(
        {
            id: _id,
            name: name,
            username: username
        }, 
        SECRET_KEY, 
        {
            algorithm: "HS256",
            expiresIn: "24h"
        }
    )
}



const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}



const getUser = (cookie) => {
    const token = cookie?.split("=")[1]
    const user = jwt.decode(token)
    return user
}


const authHelpers = {
    generateToken,
    verifyToken,
    getUser
}

export default authHelpers