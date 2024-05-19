const {check, param} = require('express-validator');
const mongoose = require('mongoose');

const addCatagoryValidator = 
[
    check('title')
    .notEmpty()
    .withMessage('Title is required')
];

//validate the category id
const idValidator =
[
    param('id').custom( async(id) =>{
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw "Invalid category id";
        }
    })
]


module.exports =
{
    addCatagoryValidator,
    idValidator,
}