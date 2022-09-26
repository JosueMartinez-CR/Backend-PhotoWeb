import { Router } from "express";
import {getProduct,createProduct,deleteProduct} from '../controllers/product.controller.js'

import multer from '../libs/multer.js';
const router = Router();

router.get('/products',getProduct)


router.route('/products')
.post(multer.array('image'),createProduct)

.delete(deleteProduct)

export default router;