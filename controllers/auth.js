const {User} = require('../models/index');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');


const signUpController = async(req,res,next) =>{
    try{

        const {name,email,password,role} = req.body;

        const isEmailExist = await User.findOne({email});
        
        if(isEmailExist){
            res.code = 400
            throw new Error('Email already exists');
        }

        const hashedPassword =  await hashPassword(password);

        const newUser = new User({name,email,password: hashedPassword,role});
        await newUser.save();

        res.status(201).json({code:201, status: true,message :"user registered successfully"});
        
    }catch(error){
        next(error);
    }
}

const signInController = async(req,res,next) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 401;
            throw new Error('Invalid credentials');
        }

        //matching the password
        const passwordMatch = await comparePassword(password,user.password);
        if(!passwordMatch){
            res.code = 401;
            throw new Error('Invalid credentials');
        }

        //generated token
        const token = generateToken(user);

        res.status(200)
        .json({code:200,status:true,message:'User signIn sucessfully', data:{token}});

    }catch(error){
        next(error);
    }
}

module.exports =
 {
    signUpController,
    signInController
}