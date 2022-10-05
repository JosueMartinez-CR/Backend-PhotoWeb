import mongoose from 'mongoose';

const homePageSchema = mongoose.Schema({
    logos: {
        public_id: String,
        secure_url: String
    },
    altLogo: String,
    Nombre: String,
    Text: String,
    background: {
        public_id: String,
        secure_url: String
    },
    admin: {
        type: String,
        require: true,
        unique: true
    }
})

export default mongoose.model ('HomePage',homePageSchema)