const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const {signupValidator, signinValidator, emailValidator, verifyUserValidator, recoverPasswordValidator} = require('../validators/auth');
const validate = require('../validators/validate');

router.post('/signup', signupValidator ,validate,authController.signUpController);

router.post('/signin',signinValidator, validate, authController.signInController);

router.post('/send-verification-email',emailValidator, validate, authController.verifyCode);

router.post('/verify-user', verifyUserValidator, validate, authController.verifyUser);

router.post('/forgot-password-code', emailValidator, validate, authController.forgotPasswordCode);

router.post('/recover-password', recoverPasswordValidator, validate , authController.recoverPassword);



module.exports = router;