'use strict';
var express = require('express');
var router  = express.Router();
const authenticateToken = require('../middlewares/authenticatetoken');

const Controller = require('../controllers/user.controller');

/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;
// require('dotenv').config();

// router.get('/test', (req, res) => {
//     // Generate JWT with 7 days expiry
//     const token = jwt.sign({ id: 'abc123' }, SECRET_KEY, { expiresIn: '7d' });
//     res.status(200).json({'__token': token, 'secret-key': process.env.SECRET_KEY});
// })
/* Add a new user */
router.post('/register', Controller.registerUser);

/* Authenticate user */
router.post('/login', Controller.loginUser);

/* Retrieve all users */
router.get('/get', authenticateToken, Controller.getUsers);

/* Find a single user */
router.get('/find/:id', authenticateToken, Controller.findUser);

/* Update a user */
// router.put('/api/update/:id', Controller.updateUser);

module.exports = router;
