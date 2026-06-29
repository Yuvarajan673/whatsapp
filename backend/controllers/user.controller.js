import { StatusCodes } from "http-status-codes"
import User from "../schemas/user.schema.js"
import authHelpers from "../helpers/auth.helper.js"

const getAllUsers = async (req, res) => {
    // Getting current user id from request
    const currentUserId = req.user.id

    // Fetch all users from the db without the current user
    const users = await User.find({
        _id: {
            $ne: currentUserId
        }
    }).sort({ username: 1 })

    if(users) return res.status(StatusCodes.OK).json({
        message: "All Users Fetched",
        status: true,
        payload: users
    })
    else return res.status(StatusCodes.NO_CONTENT).json({
        message: "No Users Found",
        status: false
    })
}



const searchUser = async (req, res) => {
    const { searchText } = req.body
    const currentUserId = authHelpers.getUser(req.headers?.cookie)?.id
    if (searchText) {
        const users = await User.find({
            $and: [
                {_id: { $ne: currentUserId }},
                {name: { $regex: searchText, $options: 'i' }}
            ]
        }).sort({ username: 1 })
    
        return res.status(StatusCodes.OK).json({
            message: "Fetched User",
            status: true,
            payload: users
        })
    }
    else {
        const users = await User.find({
        _id: {
            $ne: currentUserId
        }
        }).sort({ username: 1 })
    
        if(users) return res.status(StatusCodes.OK).json({
            message: "All Users Fetched",
            status: true,
            payload: users
        })
        else return res.status(StatusCodes.NO_CONTENT).json({
            message: "No Users Found",
            status: false
        })
    }
}


const getUserChats = async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({
        _id: userId
    })
    return res.json({payload: user})
}





const userControllers = {
    getAllUsers,
    getUserChats,
    searchUser
}


export default userControllers