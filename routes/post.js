const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { postController } = require('../controllers/index');
const { addPostValidator , updatePostValidator } = require('../validators/post');
const validate = require('../validators/validate');



router.post('/' , isAuth , addPostValidator , validate, postController.addPost );

router.put('/:id', isAuth ,);



module.exports = router;