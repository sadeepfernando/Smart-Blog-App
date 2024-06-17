const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const 
{

signupValidator, 
signinValidator, 
emailValidator,
verifyUserValidator, 
recoverPasswordValidator, 
changePasswordValidator,
updateProfileValidator

} = require('../validators/auth');

const validate = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');

router.post('/signup', signupValidator ,validate,authController.signUpController);

router.post('/signin',signinValidator, validate, authController.signInController);

router.post('/send-verification-email',emailValidator, validate, authController.verifyCode);

router.post('/verify-user', verifyUserValidator, validate, authController.verifyUser);

router.post('/forgot-password-code', emailValidator, validate, authController.forgotPasswordCode);

router.post('/recover-password', recoverPasswordValidator, validate , authController.recoverPassword);

router.put('/change-password',  isAuth , changePasswordValidator, validate, authController.changePassword);

router.put('/update-profile', isAuth , updateProfileValidator, validate , authController.updateProfile );

router.get('/current-user' , isAuth , authController.currentUser );



module.exports = router;