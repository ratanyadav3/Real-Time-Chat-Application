import express from 'express';
import { signin,signup ,logout,updateProfile} from '../controllers/auth.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middlewares.js';


const router = express.Router();

router.post('/api/login',signin)
router.post('/api/signup',signup)
router.get('/api/logout',logout)


router.put('/update-profilePic',isLoggedIn,updateProfile);


export default router;