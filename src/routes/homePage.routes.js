import { Router } from "express";
import {createHomePage, getHomePage, deleteHomePage,updateHomePage} from '../controllers/homePage.controller.js'

import multer from '../libs/multer.js';
const router = Router();

router.route('/homePage')
.post(multer.fields([
    { name: 'logos', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),createHomePage)


router.route('/homePage/:admin')
.put(multer.fields([
    { name: 'logos', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),updateHomePage)


router.route('/homePage/:admin')
//.put(updateHomePage)
.get(getHomePage)


export default router;