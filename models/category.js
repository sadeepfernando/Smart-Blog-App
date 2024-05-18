const mongoose = require('mongoose');

//creating the category schema
const categorySchema = mongoose.Schema9({
    title : {type: String, required:true},
    desc : String,
    updatedBy : {type:mongoose.Types.ObjectId, ref:'user', required : true}
},
{timestamps: true}
);

//creating the catagory model
const Category = mongoose.model('category', categorySchema);


module.exports  = Category;