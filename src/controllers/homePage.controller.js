import HomePage from "../models/homePage.model.js";
import Admin from "../models/admin.model.js";
import fs from 'fs-extra';
import path from 'path';
import { deleteImage, uploadImage } from "../libs/cloudinary.js";

//To create a home page is necesary the admnin name to create a relation.

export const createHomePage = async (req, res) => {
	const { altLogo, Nombre, Text, admin } = req.body

  	const homePage = new HomePage({altLogo, Nombre, Text, admin})
  	const files = Object.values(req.files);
	const user = await Admin.findOne({username:admin});
	
	if(user){

		console.log("User: ",user.username)
	
  if (files[0][0].path) {
		var result = await uploadImage(files[0][0].path);
		homePage.logos = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(files[0][0].path));
	}

	if (files[1][0].path) {
		result = await uploadImage(files[1][0].path);
		homePage.background = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(files[1][0].path));
	}
	try {
		await homePage.save()
		console.log(req.body)
		res.json('Agregado correctamente')
		
	} catch (err) {
		res.json('No se pudo guardar', err)
	}
}
else {
	res.json('El usuario no está registrado.')
}

}

export const updateHomePage = async (req, res) => {
	const { admin } = req.params;
	const { altLogo, Nombre, Text } = req.body
	


	const homePageOwner = await HomePage.findOne({admin: admin});
	
	console.log("Home body: ", req.body)
	if(req.files){
	const files = Object.values(req.files);
  if (files[0][0].path) {
		await deleteImage(homePageOwner.logos.public_id)
		
		var result = await uploadImage(files[0][0].path);
		
		homePageOwner.logos = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(files[0][0].path));
	}

	if (files[1][0].path) {
		await deleteImage(homePageOwner.background.public_id)

		result = await uploadImage(files[1][0].path);
		
		homePageOwner.background = {
			public_id: result.public_id,
			secure_url: result.secure_url
		}
    await fs.unlink(path.resolve(files[1][0].path));
  }
}
	try {
		
		const updatedHomePage = await HomePage.findByIdAndUpdate(homePageOwner._id, {
			logos: homePageOwner.logos,
			altLogo,
			Nombre,
			Text,
			background:homePageOwner.background
		}, {new: true});
			return res.json({
				message: 'Succesfully uptadeted',
				updatedHomePage
			})
		
		
	} catch (err) {
		return res.status(500).json({
			message: err
		});
	}

}

export const deleteHomePage = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedHomePage = await HomePage.findByIdAndDelete(id);

		if (!deletedHomePage) return res.status(404).json({
			message: 'HomePage does not exists'
		})
		await deleteImage(deletedHomePage.logos.public_id)
		await deleteImage(deletedHomePage.background.public_id)

		return res.json(deletedHomePage);
	} catch (error) {
		console.log("No se pudo eliminar")
		return res.status(500).json({
			message: error
		});
	}
};

export const getHomePage = async (req, res) => {
	
    const { admin } = req.params;
    const result = await HomePage.findOne({admin:admin});
   if(result!=null){
	return res.json(result);
   }
   else {
	res.status(404).json({
		message: 'HomePage does not exists'
	})
   }
}
