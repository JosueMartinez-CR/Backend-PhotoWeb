import { Router } from "express";
import {createAcercade, getAcercaDe} from '../controllers/acerca.controller.js'
import multer from '../libs/multer.js';
const router = Router();

router.route('/acercaDe')
.post(multer.single('logos'),createAcercade)

router.route('/acercaDe/:admin')
.get(getAcercaDe)




export default router;