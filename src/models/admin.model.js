import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String 
})

export default mongoose.model ('Admin',adminSchema)