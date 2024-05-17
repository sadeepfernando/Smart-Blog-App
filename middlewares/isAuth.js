const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');

const isAuth = async(req,res,next) =>{
    try{
        const authorization = req.headers.authorization ? req.headers.authorization.split(" ") : [];
        const token = authorization.length > 1 ? authorization[1] : null;

        if(token){
            const payLoad = jwt.verify(token, jwtSecret);

            if(payLoad){
                req.user ={
                    _id  : payLoad._id,
                    name : payLoad.name,
                    email : payLoad.email,
                    role : payLoad.role
                }
                next();
            }else{
                res.code = 401;
                throw new Error('Unauthorized');
            }

        }else{
            res.code = 400;
            throw new Error('Token is required');
        }


    }catch(error){
        next(error);
    }
}


module.exports = isAuth;