const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const {signupValidator} = require('../validators/auth');
const validate = require('../validators/validate');

router.post('/signup', signupValidator ,validate,authController.signUpController);



module.exports = router;