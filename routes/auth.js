const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const {signupValidator, signinValidator} = require('../validators/auth');
const validate = require('../validators/validate');

router.post('/signup', signupValidator ,validate,authController.signUpController);

router.post('/signin',signinValidator, validate, authController.signInController);



module.exports = router;