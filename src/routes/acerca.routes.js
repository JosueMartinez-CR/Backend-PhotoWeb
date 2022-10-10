import { Router } from "express";
import {createAcercade} from '../controllers/acerca.controller.js'
import multer from '../libs/multer.js';
const router = Router();

router.route('/acercaDe')
.post(multer.single('logos'),createAcercade)





export default router;