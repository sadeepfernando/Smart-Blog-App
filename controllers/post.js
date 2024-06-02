const { File , Category , Post } = require('../models/index')


const addPost = async(req, res, next) =>{
    try {
        const { title, desc, file, category } = req.body;
        const {_id} = req.user;

        //Check wheather file is exist or not
        if(file){
            const isFileExist = await File.findById(file);

            if(!isFileExist){
                res.code = 404;
                throw new Error('File is required');
            }
        }

        //Check wheather the category exists
        const isCategoryExist = await Category.findById(category);

        if(!isCategoryExist){
            res.code = 404;
            throw new Error('Category is required');
        }

        const newPost = new Post({
            title, 
            desc,
            file,
            category,
            updatedBy: _id,
        });

        await newPost.save();

        res.status(201)
        .json({code:201, status:true, message:'Post added successfully'});

    } catch (error) {
        next(error);
    }
}



module.exports =
{
    addPost,
}