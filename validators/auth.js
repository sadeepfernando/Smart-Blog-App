const {check} = require('express-validator');

const signupValidator = 
[
    //name validation
    check('name')
    .notEmpty()
    .withMessage('Name is required'),

    //email validation
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

    //password validation
    check('password')
    .isLength({min:5})
    .withMessage('Should be more than 5 characters')
    .isEmpty()
    .withMessage('Password is required')

];

module.exports = 
{
    signupValidator
};