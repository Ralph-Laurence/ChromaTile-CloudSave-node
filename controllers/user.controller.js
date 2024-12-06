const User = require('../models/user.model.js');

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

module.exports = {
    getUsers,
    registerUser,
    findUser,
    //updateUser
};