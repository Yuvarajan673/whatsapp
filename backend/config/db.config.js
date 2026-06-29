import mongoose from "mongoose";
import { DB_URL } from "./env.config.js";

mongoose.connect(DB_URL, { dbName: "whatsapp" })
.then(() => console.log("Database Connected"))
.catch(err => console.log(`Database Connection Error: ${err}`))