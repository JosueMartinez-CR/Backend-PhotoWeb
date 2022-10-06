import { Router } from "express";
import {createAdmin, updateAdmin} from '../controllers/admin.controller.js'
const router = Router();


router.route('/admin')
.post(createAdmin)

router.route('/admin/:username')
.put(updateAdmin)



export default router;