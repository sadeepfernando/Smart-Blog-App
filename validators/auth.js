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
    .notEmpty()
    .withMessage('Password is required')

];

const signinValidator =
[
    //email validation
    check('email')
    .isEmail()
    .withMessage('Invalid Email')
    .notEmpty()
    .withMessage('Email is required'),

    //password validation
    check('password')
    .notEmpty()
    .withMessage('Password is required')
];

const emailValidator =
[
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required')
];

const verifyUserValidator =
[
    //Email validation
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

    //code validation
    check('code')
    .notEmpty()
    .withMessage('Code is required')

];

const recoverPasswordValidator =
[
        //Email validation
        check('email')
        .isEmail()
        .withMessage('Invalid email')
        .notEmpty()
        .withMessage('Email is required'),

        //code validation
         check('code')
         .notEmpty()
         .withMessage('Code is required'),

        //password validation
        check('password')
        .isLength({min:5})
        .withMessage('Should be more than 5 characters')
        .notEmpty()
        .withMessage('Password is required')

]   

module.exports = 
{
    signupValidator,
    signinValidator,
    emailValidator,
    verifyUserValidator,
    recoverPasswordValidator
};