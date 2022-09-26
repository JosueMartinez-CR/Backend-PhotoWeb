import mongoose from "mongoose";

const homePageSchema = mongoose.Schema({
    _id: String,
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
    }

    // admin:{
    //     type: Schema.Types.ObjectId, ref: 'Admin'   //Futures updates
    // }
})

export default mongoose.model ('HomePage',homePageSchema)