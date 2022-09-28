

import mongoose from 'mongoose';
export async function startConnection() {
    try{
        console.log("conn: ", process.env.DATABASE_CONNECTION);
        await mongoose.connect(process.env.DATABASE_CONNECTION || "DATABASE");
        console.log("DATABASE CONNECTED"); 
    } catch(error){
        console.log("Conexión fallida: ", error)
    }
 }
