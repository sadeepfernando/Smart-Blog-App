const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const {fileController} = require('../controllers/index');
const uploads  = require('../middlewares/uploads');

router.post('/upload', isAuth , uploads.single('image') , fileController.uploadFile);

router.get('/signed-url', isAuth , fileController.getSignedUrl );


module.exports = router;