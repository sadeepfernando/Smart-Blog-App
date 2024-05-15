const {User} = require('../models/index');


const signUpController = async(req,res,next) =>{
    try{

        const {name,email,password,role} = req.body;

        if(!name){
            res.code =400;
            throw new Error('User name is required');
        }
        if(!email){
            res.code = 400;
            throw new Error('Email is required');
        }
        if(!password){
            res.code = 400;
            throw new Error('Password is required');
        }
        if(password.length < 5){
            res.code = 400;
            throw new Error('Password should be at least 5 characters');
        }
        

        const newUser = new User({name,email,password,role});
        await newUser.save();

        res.status(201).json({code:201, status: true,message :"user registered successfully"});
        
    }catch(error){
        next(error);
    }
}

module.exports =
 {
    signUpController
}