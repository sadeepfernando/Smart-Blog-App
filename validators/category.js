const {check} = require('express-validator');

const addCatagoryValidator = 
[
    check('title')
    .notEmpty()
    .withMessage('Title is required')
];


module.exports =
{
    addCatagoryValidator,
}