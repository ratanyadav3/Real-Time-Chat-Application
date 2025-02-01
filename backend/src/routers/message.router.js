import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.middlewares.js';
import {getMessage, getUsersForSidebar, sendMessage} from '../controllers/message.controller.js'


const router = express.Router();

router.get('/users',isLoggedIn,getUsersForSidebar)

router.get('/:id',isLoggedIn,getMessage);

router.post('/send/:id',isLoggedIn,sendMessage);


 export default router;