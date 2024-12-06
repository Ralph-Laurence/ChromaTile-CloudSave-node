'use strict';
var express = require('express');
var router  = express.Router();

const Controller = require('../controllers/user.controller');

/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });

/* Add a new user */
router.post('/api/register', Controller.registerUser);

/* Retrieve all users */
router.get('/', Controller.getUsers);

/* Find a single user */
router.get('/api/find/:id', Controller.findUser);

/* Update a user */
// router.put('/api/update/:id', Controller.updateUser);

module.exports = router;
