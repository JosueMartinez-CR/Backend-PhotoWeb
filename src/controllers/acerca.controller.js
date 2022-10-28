import Acerca from "../models/acerca.model.js";
import Admin from "../models/admin.model.js";
import fs from 'fs-extra';
import path from 'path';
import { deleteImage, uploadImage } from "../libs/cloudinary.js";

//To create a acercaDe is necesary the admnin name to create a relation.

export const createAcercade = async (req, res) => {
	const {Nombre, Text1, Text2, altLogo, admin } = req.body

  	const acercaDe = new Acerca({Nombre, Text1, Text2, altLogo, admin})
  	const file = req.file
	const user = await Admin.findOne({username:admin});

	if(user){
		console.log("User: ",user.username)
		var result = await uploadImage(file.path);
		acercaDe.logos = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(file.path));

    try {
		await acercaDe.save()
		res.json('Agregado correctamente acercaDe')
		
	} catch (err) {
		res.json('No se pudo guardar', err)
	}
}
else {
	res.json('El usuario no está registrado.')
}

}

export const updateAcercade = async (req, res) => {
	const { admin } = req.params;
	const {Nombre, Text1, Text2, altLogo } = req.body
	


	const acercaDe = await Acerca.findOne({admin: admin});
	
	if(req.file){
	const file = req.file;
  
		await deleteImage(acercaDe.logos.public_id)
		
		var result = await uploadImage(file.path);
		
		acercaDe.logos = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(file.path));
	}


	try {
		
		const updatedAcerca = await Acerca.findByIdAndUpdate(acercaDe._id, {
			logos: acercaDe.logos,
			altLogo,
			Nombre,
			Text1,
			Text2

		}, {new: true});
			return res.json({
				message: 'Succesfully uptadeted',
				updatedAcerca
			})
		
		
	} catch (err) {
		return res.status(500).json({
			message: err
		});
	}

}

export const deleteAcercaDe = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedAcerca = await Acerca.findByIdAndDelete(id);

		if (!deletedAcerca) return res.status(404).json({
			message: 'Acercade does not exists'
		})
		await deleteImage(deletedAcerca.logos.public_id)

		return res.json(deletedAcerca);
	} catch (error) {
		console.log("No se pudo eliminar")
		return res.status(500).json({
			message: error
		});
	}
};

export const getAcercaDe = async (req, res) => {
	
    const { admin } = req.params;
    const result = await Acerca.findOne({admin:admin});
   if(result!=null){
	return res.json(result);
   }
   else {
	res.status(404).json({
		message: 'AcercaDe does not exists'
	})
   }
}
