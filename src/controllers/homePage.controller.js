import HomePage from "../models/homePage.model.js";
import Admin from "../models/admin.model.js";
import fs from 'fs-extra';
import path from 'path';
import { deleteImage, uploadImage } from "../libs/cloudinary.js";

//To create a home page is necesary the admnin name to create a relation.
// Para crearlos debe ser obligatorio que el front mande los files
export const createHomePage = async (req, res) => {
    const { altLogo, Nombre, Text, admin } = req.body
    console.log("ad ", req.body);
    const homePage = new HomePage({ altLogo, Nombre, Text, admin })
    const files = req.files;
    const user = await Admin.findOne({ username: admin });

    if (user) {

        await insertLogo(homePage, files.logos[0].path, 0);
        await insertBackground(homePage, files.background[0].path, 0);

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

    const homePageOwner = await HomePage.findOne({ admin: admin });
    console.log(req.files)

    if (req.files) {
        const files = req.files;

        if (files.logos) {
            await insertLogo(homePageOwner, files.logos[0].path, 1);

        }
        if (files.background) {
            await insertBackground(homePageOwner, files.background[0].path, 1);
        }
    }

    try {

        const updatedHomePage = await HomePage.findByIdAndUpdate(homePageOwner._id, {
            logos: homePageOwner.logos,
            altLogo,
            Nombre,
            Text,
            background: homePageOwner.background
        }, { new: true });
        return res.json({
            message: 'Succesfully uptadeted',
            updatedHomePage
        })

    } catch (err) {
        return res.status(500).json({
            message: "No se pudo actualizar."
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
    const result = await HomePage.findOne({ admin: admin });
    if (result != null) {
        return res.json(result);
    }
    else {
        res.status(404).json({
            message: 'HomePage does not exists'
        })
    }
}

//auxiliary functions for inserting and modifying homePage images
async function insertLogo(homePageOwner, pathx, flag) {

    if (flag == 1) {
        await deleteImage(homePageOwner.logos.public_id)
    }

    var result = await uploadImage(pathx);

    homePageOwner.logos = {
        public_id: result.public_id,
        secure_url: result.secure_url
    }

    await fs.unlink(path.resolve(pathx));
}

async function insertBackground(homePageOwner, pathx, flag) {
    if (flag == 1) {
        await deleteImage(homePageOwner.background.public_id)
    }

    var result = await uploadImage(pathx);

    homePageOwner.background = {
        public_id: result.public_id,
        secure_url: result.secure_url
    }
    await fs.unlink(path.resolve(pathx));

}