const express = require('express');
const router = express.Router;
const isAuth = require('../middlewares/isAuth');
const {fileController} = require('../controllers/index');

router.post('/upload', isAuth , fileController.uploadFile);


module.exports = router;