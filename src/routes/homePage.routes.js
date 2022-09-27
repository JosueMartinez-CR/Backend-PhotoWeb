import { Router } from "express";
import {createHomePage, getHomePage, deleteHomePage} from '../controllers/homePage.controller.js'

import multer from '../libs/multer.js';
const router = Router();



router.route('/homePage')
.post(multer.fields([
    { name: 'logos', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),createHomePage)
.get(getHomePage)


router.delete('/homePage/:id',deleteHomePage)

export default router;