require('dotenv').config();

const User   = require('../models/user.model');
const jwt    = require('jsonwebtoken');
const cipher = require('../security/cipher');

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {

    try 
    {
        const user   = await User.create(req.body);
        const userId = user._id;

        // Generate JWT with 7 days expiry
        const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '7d' });

        // Respond with the user model and token
        // res.status(200).json({ model: user, token });
        const encryptedUserId = cipher.encrypt(userId.toString());

        res.status(200).json({
            Username: user.username,
            Token   : token,
            UserID  : encryptedUserId
        });
    }
    catch (error)
    {
        if (error.code === 11000)
            res.status(400).json({'message': 'Username is taken. Please choose another.'});
        else
            res.status(500).json({'message': error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user)
            return res.status(401).send('Invalid username or password');

        // Compare the provided password with the stored hash
        const isMatch = await user.comparePassword(password);

        if (!isMatch)
            return res.status(401).send('Invalid username or password');
        
        const userId = user._id;

        // Generate JWT with 7 days expiry
        const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '7d' });

        //const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' });

        // Respond with the user model and token
        const encryptedUserId = cipher.encrypt(userId.toString());

        res.status(200).json({
            Username: user.username,
            Token   : token,
            UserID  : encryptedUserId,
            Message : 'Login successful'
        });

        // Send token to client
        // res.status(200).json({ message: 'Login successful', token });
    }
    catch (error)
    {
        res.status(500).send(error);
    }
}

const getUsers = async (req, res) =>
{
    try 
    {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error)
    {
        res.status(500).json({'message': error.message});
    }
};

const findUser = async (req, res) => 
{
    try 
    {
        const { id } = req.params;
        const user   = await User.findById(id);

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

module.exports = {
    getUsers,
    registerUser,
    findUser,
    loginUser
    //updateUser
};