const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth =async (req,res,next)=>{
    try{
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            })
        }
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'Token invalid'
            })
        }
        next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.isStudent =async (req,res,next)=>{
    try{
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'Role is only for student',
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }

}


exports.isAdmin =async (req,res,next)=>{
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'Role is only for Admin',
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }

}