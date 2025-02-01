import express from 'express';
import {checkAuth, signin,signup ,logout,updateProfile} from '../controllers/auth.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middlewares.js';


const router = express.Router();

router.post('/login',signin)
router.post('/signup',signup)
router.get('/logout',logout)


router.put('/update-profilePic',isLoggedIn,updateProfile);

router.get('/check-auth',isLoggedIn,checkAuth);



export default router;