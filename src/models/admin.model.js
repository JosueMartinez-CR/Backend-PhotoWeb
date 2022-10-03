import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    homepage: Number
})

export default mongoose.model ('Admin',adminSchema)