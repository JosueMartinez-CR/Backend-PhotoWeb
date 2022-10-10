
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
    res.json('Agregado correctamente')
  }
}

export const updateAdmin = async (req, res) => {

 const {username} = req.params;
 const {email, password} = req.body;
 const originalAdmin = await Admin.findOne({username:username});

 
 if(originalAdmin != null){
  try {
    const adminUpted = await Admin.findOneAndUpdate(originalAdmin._id, {
    email,
    password

    }, {new: true});
			return res.json({
				message: 'Succesfully uptadeted',
				adminUpted
			})
  
  } catch (error) {
    return res.status(500).json({
			message: error
		});
    
  }

 }else{

  return res.status(500).json({
    message: "No se actualizó"
  });
 }
} 



