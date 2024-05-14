const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {typr: String, required:true},
    email: {typr: String, required:true, unique: true, trim:true},
    password : {type:String, required:true, minlength:5},
     //role 1 - super admin
    //role 2 - normal admin
    //role 3 - user
    role : {type:Number,default:3}
});

//initialize the model
const User = mongoose.model('user',userSchema);

//export the User module
module.exports = User;