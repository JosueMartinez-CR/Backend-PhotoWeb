import mongoose from 'mongoose';

const acercaSchema = mongoose.Schema({
    Nombre: String,
    Text1: String,
    Text2: String,
    altLogo: String,
    logos: {
        public_id: String,
        secure_url: String
    },
    admin: String
})

export default mongoose.model ('acerca',acercaSchema)