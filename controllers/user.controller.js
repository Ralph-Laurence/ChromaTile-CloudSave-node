const User = require('../models/user.model');

const registerUser = async (req, res) => {
    
    console.log("Data recieved!");

    try 
    {
        const model = await User.create(req.body);
        res.status(200).json(model);
    }
    catch (error)
    {
        res.status(500).json({'message': error.message});
    }
};

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

// const updateUser = async (req, res) => 
// {
//     try 
//     {
//         const { id } = req.params;
//         const user   = await User.findByIdAndUpdate(id, {
            
//         });

//         if (!user)
//             return res.status(404).json({'message': "User not found"});

//         res.status(200).json(user);
//     }
//     catch (error) {
//         res.status(500).json({ 'message': error.message });
//     }
// };

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

        res.status(200).send('Login successful');
    }
    catch (error)
    {
        res.status(500).send(error);
    }
}

module.exports = {
    getUsers,
    registerUser,
    findUser,
    loginUser
    //updateUser
};