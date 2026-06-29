import { StatusCodes } from "http-status-codes"
import authHelpers from "../helpers/auth.helper.js"

const checkToken = (req, res, next) => {
    const { cookie } = req.headers
    if (!cookie) return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
        status: false
    })
    const token = cookie.split("=")[1]
    try {
        const response = authHelpers.verifyToken(token)
        if(response.id) {
            req.user = response
            next()
        }
    }
    catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid Token",
            status: false
        })
    }

}

const authMiddlewares = {
    checkToken
}

export default authMiddlewares