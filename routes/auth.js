const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');

router.post('/signup',authController.signUpController);



module.exports = router;