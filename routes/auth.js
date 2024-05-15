const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const {signupValidator} = require('../validators/auth');

router.post('/signup', signupValidator ,authController.signUpController);



module.exports = router;