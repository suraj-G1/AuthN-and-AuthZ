const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup =async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.send(400).json({
                success:false,
                message:'User Already Exists',
            })
        }
    }catch(err){

    }
}