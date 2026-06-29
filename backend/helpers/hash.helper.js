import bcrypt from "bcrypt"

const genHashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

const hashHelpers = {
    genHashPassword,
    verifyPassword
}

export default hashHelpers