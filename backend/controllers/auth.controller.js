import authHelpers from "../helpers/auth.helper.js"
import hashHelpers from "../helpers/hash.helper.js"
import StatusCodes from "http-status-codes"
import User from "../schemas/user.schema.js"


const login = async (req, res) => {
    // Extracting The Payload From The Request
    const { name, mobileNo, username, password } = req.body
    
    // Passing the Username to Check it's Already Exists
    const user = await User.findOne({
        username: username
    })

    // Return the Not Found Response if the Username Didn't Exist
    if(!user) return res.status(StatusCodes.NOT_FOUND).json({
        message: "Username Doesn't Exists",
        status: false
    })

    // Compare the Passwords
    const isMatch = await hashHelpers.verifyPassword(password, user.password)

    // Returning the Bad Request if the Passwords Not Match
    if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Password Didn't Match",
        status: false
    })

    // Creating the Token
    const token = authHelpers.generateToken(user)

    // Setting the Token in Cookie
    res.cookie('token', token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',    
        maxAge: 3600000
    })
    
    if (token) return res.status(StatusCodes.OK).json({
        message: "Logged In Successfully",
        status: true,
        payload: {
            userId: user.id
        }
    })

}




const signup = async (req, res) => {
    // Extracting the Payload From the Request
    const payload = req.body

    // Passing the Username to Check it's Already Exists
    const user = await User.findOne({
        username: payload.username
    })

    // Checking the Username Already Exist
    if(user) return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Already Exists with This Username",
        status: false
    })

    // Create Hashed Password
    const hashedPassword = await hashHelpers.genHashPassword(payload.password)
    // Replace the Hashed Password with Payload
    payload.password = hashedPassword
    // Creating the User
    const response = await User.create(payload)
    console.log(response)
    // Checking Is the User Created or Not
    if (response._id) return res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully",
        status: true
    })
    else return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Creation Failed Try Again",
        status: false
    })
    
}


const authControllers = {
    login,
    signup
}

export default authControllers