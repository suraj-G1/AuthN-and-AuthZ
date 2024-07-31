const express = require('express');
const router = express.Router();

const {login,signup} = require('../controller/auth');
const {auth , isStudent,isAdmin} = require('../middleware/auth');
router.post('/login',login);
router.post('/signup',signup);


//Protected routes

router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to route of Only Student'
    })
});

router.get("/admin",auth , isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Only admin can see this'
    })
})
module.exports = router;