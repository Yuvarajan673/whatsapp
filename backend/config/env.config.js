import { configDotenv } from "dotenv"

configDotenv({ quiet: true })

export const DB_URL = process.env.DB_URL
export const PORT = process.env.PORT
export const SECRET_KEY = process.env.SECRET_KEY