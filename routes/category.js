const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers/index');
const {addCatagoryValidator} = require('../validators/category');
const validate = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', isAuth , isAdmin , addCatagoryValidator , validate , categoryController.addCategory);


module.exports = router;