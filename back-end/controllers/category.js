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

const updateCategory = async(req, res, next) =>{
    try{
        const { id } = req.params;
        const { _id } = req.user;
        const { title, desc } = req.body;

        const category = await Category.findById(id);
        if(!category){
            res.code = 404;
            throw new Error('Category not found');
        }

        const isCategoryExist = await Category.findOne({title});
        if(isCategoryExist === isCategoryExist.title === title && String(isCategoryExist._id) !== String(category.id)){
            res.code = 400;
            throw new Error('Title already exists');
        }

        //If all the conditions are fulfilled
        category.title = title ? title : category.title;
        category.desc = desc;
        category.updatedBy = _id;

        await category.save();

        res.status(200)
        .json({code:200, status:true, message:'Category updated successfully', data: {category}});

    }catch(error){
        next(error);
    }
}

const deleteCategory = async(req,res, next) =>{
    try{
        const { id } = req.params;

        const category = await Category.findById(id);
        if(!category){
            res.code = 404;
            throw new Error('Category not found');
        }

        await category.findByIdAndDelete(id);

        res.status(200)
        .json({code:200, status: true, message:'Category deleted successfully'});

    }catch(error){
        next(error);
    }
}

const getCategories = async(req, res, next) =>{
    try{
        const { q , size ,page } = req.query;
        let query = {};
        const sizeNumber = parseInt(size) || 10;
        const pageNumber = parseInt(page) || 1;

        if(q){

            //'i' is a flag that use to identify both simple and capital strings
            const search = RegExp(q, 'i');
            //It will return categories according to both title and description ket words
            query = { $or :[ {title : search}, {desc: search} ]};
        }
        //pagination according to number of resulted categories
        const total = await Category.countDocuments(query);
        const pages = Math.ceil(total / sizeNumber);

         //skip is used to skip first n documents in the database and display for that onwards
        //Limit used to get the range that should display
        // ((5-1)*10 = 40)and by the use of limit it shows 40 - 50 documents(change according to sizeNumber)
        //sort is used to show the list in desecnding order
        const categories = await Category.find(query)
                            .skip( (pageNumber - 1) * sizeNumber)
                            .limit(sizeNumber)
                            .sort({updatedBy : -1});

        res.code = 200;
        res.status(200).json({code: 200, status:true, message:'Get categories successfully', data: {categories, total, pages}});

    }catch(error){
        next(error);
    }
}

const getCategory = async(req,res,next) =>{
    try{
        const { id } = req.params;

        const category = await Category.findById(id);
        if(!category){
            res.code = 404;
            throw new Error(error);
        }

        res.status(200)
        .json({ code : 200, status: true, message:'Category found successfully', data:{category} });

    }catch(error){
        next(error);
    }
}



module.exports =
{
    addCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory,
}