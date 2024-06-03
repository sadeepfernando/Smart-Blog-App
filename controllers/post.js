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

const updatePost = async(req,res,next) =>{
    try {
        const { title, desc, file, category } = req.body;
        const { id } = req.params;
        const { _id } = req.user;

        if(file){
            const isFileExist = await File.findById(file);

            if(!isFileExist){
                res.code = 404;
                throw new Error('File do not Exist');
            }
        }

        if(category){
            const isCategoryExist = await Category.findById(category);

            if(!isCategoryExist){
                res.code = 404;
                throw new Error('Category does not Exist');
            }
        }

        const post = await Post.findyById(id);
        if(!post){
            res.code = 404;
            throw new Error('Post not found');
        }

        post.title = title ? title: post.title;
        post.desc = desc;
        post.file = file;
        post.category = category ? category : post.category;
        post.updatedby = _id;

        await post.save();

        res.status(200)
        .json({code:200 , status:true, message:'Post updated successfully', data:{post}});

    } catch (error) {
        next(error);
    }
}



module.exports =
{
    addPost,
    updatePost,
}