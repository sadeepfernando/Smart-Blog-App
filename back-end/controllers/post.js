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

        const post = await Post.findById(id);
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

const deletePost = async(req, res, next) =>{
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if(!post){
            res.code = 404;
            throw new Error('Post not found');
        }

        await Post.findByIdAndDelete(id);

        res.status(200)
        .json({code:200, status:true, message:'Post deleted successfully'});

    } catch (error) {
        next(error);
    }
}

const getPost = async (req, res, next) => {
    try {
      const { page, size, q, category } = req.query;
  
      const pageNumber = parseInt(page) || 1;
      const sizeNumber = parseInt(size) || 10;
      let query = {};
  
      if (q) {
        const search = new RegExp(q, "i");
  
        query = {
          $or: [{ title: search }],
        };
      }
  
      if (category) {
        query = { ...query, category };
      }
  
      const total = await Post.countDocuments(query);
      const pages = Math.ceil(total / sizeNumber);
  
      const posts = await Post.find(query)
        .populate("file")
        .populate("category")
        .populate("updatedBy", "-password -verificationCode -forgotPasswordCode")
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * sizeNumber)
        .limit(sizeNumber);
  
      res.status(200).json({
        code: 200,
        status: true,
        message: "Get post list successfully",
        data: { posts, total, pages },
      });
    } catch (error) {
      next(error);
    }
  };
  

const getSinglePost = async(req, res, next) =>{
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
                    .populate('file')
                    .populate('category')
                    .populate('updatedBy ','-password -verificationCode -forgotPasswordCode');

        if(!post){
            res.code = 404;
            throw new Error('Post not found');
        }

        res.status(200)
        .json({code:200, status:true , message:'Post found successfully'});

    } catch (error) {
        next(error);
    }
}


module.exports =
{
    addPost,
    updatePost,
    deletePost,
    getPost,
    getSinglePost,
}