import HomePage from "../models/homePage.model.js";
import fs from 'fs-extra';
import path from 'path';
import { deleteImage, uploadImage } from "../libs/cloudinary.js";


export const createHomePage = async (req,res)=> {
    
    const {altLogo,Nombre,Text,admin} = req.body
  
    const homePage = new HomePage ({
        altLogo,
        Nombre,
        Text,
        admin
     })


    const files = Object.values(req.files);
    if(files[0][0].path){
    var result = await uploadImage(files[0][0].path);
    homePage.logos = {
        public_id: result.public_id,
        secure_url: result.secure_url
    }
}

    
if(files[1][0].path){
    result = await uploadImage(files[1][0].path);
    homePage.background = {
        public_id : result.public_id,
        secure_url : result.secure_url
    }
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

    const { username } = req.params;
    const {altLogo,Nombre,Text} = req.body
    const files = Object.values(req.files);
    
    const homePageOwner = HomePage.findOne({username:username});

    try {
    
      await HomePage.findByIdAndUpdate(homePageOwner.id, {
        logos : files[0][0].path,
        altLogo,
        Nombre,
        Text,
        background :files[1][0].path,
    }); 
    await fs.unlink(path.resolve(files[0][0].path));
    await fs.unlink(path.resolve(files[1][0].path));

} catch(err) {
     res.json('No se pudo actualizar')
  }
  
  await fs.unlink(path.resolve(files[0][0].path));
  await fs.unlink(path.resolve(files[1][0].path));

}



export const deleteHomePage = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("hola", req.params);
      const deletedHomePage = await HomePage.findByIdAndDelete(id);
  
      if (!deletedHomePage) return res.status(404).json({message: 'HomePage does not exists'})
        console.log("id: ", deletedHomePage.logos.public_id)
      await deleteImage(deletedHomePage.logos.public_id)
      await deleteImage(deletedHomePage.background.public_id)
      
      return res.json(deletedHomePage);
    } catch (error) {
        console.log("No se pudo borrar")
      return res.status(500).json({ message: error });
    }
  };



export const getHomePage = async (req,res)=> {
    const homePages= await HomePage.find()
    res.send(homePages)
}