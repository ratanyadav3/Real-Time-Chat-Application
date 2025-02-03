import express from 'express';
import {checkAuth, signin,signup ,logout,updateProfile} from '../controllers/auth.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middlewares.js';


const router = express.Router();

router.post('/login',signin)
router.post('/signup',signup)
router.post('/logout',logout)


router.put('/update-profile',isLoggedIn,updateProfile);

router.get('/check',isLoggedIn,checkAuth);



export default router;