
import Admin from '../models/admin.model.js';
//import bcrypt from 'bcrypt';
//Remeber do the data validation in the front - end
export const createAdmin = async (req,res)=> {
    const {username,email,password} = req.body
     
     Admin.findOne({username:username}, (err,user) => {
        if(err){
            return res.status(400).json({error: 'Server error'});
        }
        if(user){
            return res.status(400).json({
                msj: ' Ya existe un administrador con ese nombre.'
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
    res.json('Agregado correctamente')
  } catch(err) {
    // catches errors both in fetch and response.json
    res.json('Agregado correctamente')
  }
}