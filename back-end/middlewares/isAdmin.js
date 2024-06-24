
const isAdmin = (req, res, next) =>{
    try{
        if(req.user && (req.user.role === 1 || req.user.role === 2 || req.user.role === 3)){

            //If the user is a valid and rolr is 1,2 ,the the user can add category
            next();

        }else{
            
            res.code = 401;
            throw new Error('Permission denied');
        }
    }catch(error){
        next(error);
    }
}



module.exports = isAdmin;