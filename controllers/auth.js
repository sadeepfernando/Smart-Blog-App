const {User} = require('../models/index');


const signUpController = async(req,res,next) =>{
    try{
        const {name,email,password,role} = req.body;

        const newUser = new User({name,email,password,role});
        await newUser.save();

        res.status(201).json({message :"user registered successfully"});
        
    }catch(error){
        next(error);
    }
}

module.exports =
 {
    signUpController
}