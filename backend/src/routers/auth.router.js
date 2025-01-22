import express from 'express';

const router = express.Router();

router.get('/api/login',(req,res)=>{
    res.send("sigin Route");
})


router.get('/api/signup',(req,res)=>{
    res.send("Signup Route");
})

router.get('/api/logout',(req,res)=>{
    res.send("Logout Route");
})

export default router;