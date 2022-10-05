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
    admin: String
})

export default mongoose.model ('HomePage',homePageSchema)