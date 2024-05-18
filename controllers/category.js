const {Category, User} = require('../models/index');


const addCategory = async(req,res,next) =>{
    try{
        const {title, desc} = req.body;
        const {_id} = req.user;

        //find wheather the category is there
        const iscategoryExist = await Category.findOne({title});
        if(iscategoryExist){
            res.code = 400;
            throw new Error('Category already exists')
        }

        //find wheather there is such a user
        const user = await User.findById(_id);
        if(!user){
            req.code = 404;
            throw new Error('User not found');
        }

        //If the the things are correct then execute the following
        const newCategory = new Category({title, desc, updatedBy:_id});
        await newCategory.save();

        res.status(200)
        .json({code:200, status: true, message :'New category added successfully'});
        
    }catch(error){
        next(error);
    }
}



module.exports =
{
    addCategory,
}