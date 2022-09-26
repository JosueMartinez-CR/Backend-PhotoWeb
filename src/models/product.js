import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim:true,      //Barro espacios en blanco
        unique: true
    },
    imagePath:[String] 
    
})

export default mongoose.model ('Product',productSchema)

