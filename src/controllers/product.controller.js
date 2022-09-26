import Product from "../models/product.js"
import fs from 'fs-extra';
import path from 'path';

export const getProduct = async (req,res)=> {
    const products = await Product.find()
    res.send(products)
}

export const createProduct = async (req,res)=> {
    
    const {name} = req.body
    var paths = [];
    console.log(req.files)
    
//     for (var i = 0; i < req.files.length; i++) {
//         paths.push(req.files[i].path);
//      }

     
//      Product.findOne({name:name}, (err,user) => {
//         if(err){
//             return res.status(400).json({error: 'Server error'});
//         }
//         if(user){
//             return res.status(400).json({
//                 msj: 'El producto ya existe'
//             });
//         }
//      })

//    const product = new Product({
//     name,
//     imagePath: paths,
//    })   

//    try {
//     await product.save()
//     console.log(req.body)
//     res.json('Agregado correctamente')
//   } catch(err) {
//     // catches errors both in fetch and response.json
//     console.log("Seguimos")

//     for (var i = 0; i < req.files.length; i++) {
//         await fs.unlink(path.resolve(req.files[i].path))
//      }
//   }
   
   
}





export const deleteProduct= async (req,res)=> {

   console.log(req.body)
    const product = await  Product.findOne({name:req.body.name});

    if (product){
        
        await fs.unlink(path.resolve(product.imagePath))
    
    return res.json({
        message: 'Photo Deleted',
        product
    })
} else {
    return res.json({
        message: 'Invalide name!',
})
}

}

