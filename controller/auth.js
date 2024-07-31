const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
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

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }catch(error){
            return res.status(500).json({
                success:false,
                message:'error in hashing password',
            })
        }

        const user = User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'user created successfully',
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Try again laterr',
        })
    }
}

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Pleasse fill both fields',
            })
        }

        let user =await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found',
            })
        }
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        
        
        if(await bcrypt.compare(password,user.password)){
            let token =await jwt.sign(payload,
                process.env.JWT_SECRET,
                {expiresIn:'2h'});
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie('SurajCookie',token,options).status(200).json({
                success:true,
                token,
                user,
                message:'User logged in Successfully'
            })

        }else{
            return res.status(403).json({
                success:true,
                message:'Password not matches',
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Error while logging in'
        })
    }
}