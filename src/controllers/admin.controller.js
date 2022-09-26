
import Admin from '../models/admin.model.js';
//import bcrypt from 'bcrypt';

export const createAdmin = async (req,res)=> {
    const {username,email,password} = req.body
     
     Admin.findOne({email:email}, (err,user) => {
        if(err){
            return res.status(400).json({error: 'Server error'});
        }
        if(user){
            return res.status(400).json({
                msj: ' Ya existe un administrador con ese correo.'
            });
        }
     })

   const admin = new Admin({
    username:username,
    email: email,
    password:password
   })   

   try {
    await admin.save()
    console.log(req.body)
    res.json('Agregado correctamente')
  } catch(err) {
    // catches errors both in fetch and response.json
    console.log("No se ha guardado")
  }
}