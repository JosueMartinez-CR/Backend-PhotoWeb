import HomePage from "../models/homePage.model.js";
import fs from 'fs-extra';
import path from 'path';
import { uploadImage } from "../libs/cloudinary.js";


export const createHomePage = async (req,res)=> {
    
    const {altLogo,Nombre,Text} = req.body
  
    const homePage = new HomePage ({
        _id : 'header',
        altLogo,
        Nombre,
        Text,
     })


    const files = Object.values(req.files);
    
    if(files[0][0].path){
    var result = await uploadImage(files[0][0].path);
    homePage.logos = {
        public_id: result.public_id,
        secure_url: result.secure_url
    }

    console.log("Esto es el resultado: ",  typeof(result.public_id), " ",result.public_id);
}

    
if(files[1][0].path){

    
    result = await uploadImage(files[1][0].path);
    
    
   
    homePage.background = {
        public_id : result.public_id,
        secure_url : result.secure_url
    }
    console.log("Esto es el resultado2: ",  homePage.background.public_id);
}
   try {
    await homePage.save()
    console.log(req.body)
    res.json('Agregado correctamente')
    await fs.unlink(path.resolve(files[0][0].path));
    await fs.unlink(path.resolve(files[1][0].path));

  } catch(err) {
     res.json('No se pudo guardar')
     await fs.unlink(path.resolve(files[0][0].path));
     await fs.unlink(path.resolve(files[1][0].path));
  }

 
   
}

export const updateHomePage = async (req,res)=> {

    const { id } = req.params;
    const {altLogo,Nombre,Text} = req.body
    const files = Object.values(req.files);
    
    try {
    const homePage = await Photo.findByIdAndUpdate(id, {
        logos : files[0][0].path,
        altLogo,
        Nombre,
        Text,
        background :files[1][0].path,
    }); 

} catch(err) {
     res.json('No se pudo actualizar')
  }

}
