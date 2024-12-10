'use strict';
var express = require('express');
var router  = express.Router();
const authenticateToken = require('../middlewares/authenticatetoken');
const Controller = require('../controllers/user.controller');
const fileupload = require('../middlewares/fileupload');
const filedownload = require('../middlewares/filedownload');

//const rootDir = require('../root_path');
//const multer  = require('multer');
/* Add a new user */
router.post('/register', Controller.registerUser);

/* Authenticate user */
router.post('/login', Controller.loginUser);

/* Retrieve all users */
router.get('/get', authenticateToken, Controller.getUsers);

/* Find a single user */
router.get('/find/:id', authenticateToken, Controller.findUser);

/* Upload file */
router.put('/upload', authenticateToken, Controller.checkUserExists, fileupload);

/* Download file */
router.get('/download', authenticateToken, Controller.checkUserExists, filedownload);//  filedownload);

module.exports = router;
