const {User} = require('../models/index');


const signUpController = async(req,res,next) =>{
    try{

        const {name,email,password,role} = req.body;

        const isEmailExist = await User.findOne({email});
        
        if(isEmailExist){
            res.code = 400
            throw new Error('Email already exists');
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